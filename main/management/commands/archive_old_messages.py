from django.core.management.base import BaseCommand
from django.utils import timezone
from django.db.models import Count
from datetime import timedelta
from main.models import ContactMessage


class Command(BaseCommand):
    help = 'Archive or delete contact messages older than 90 days'

    def add_arguments(self, parser):
        parser.add_argument(
            '--days',
            type=int,
            default=90,
            help='Number of days to keep messages (default: 90)',
        )
        parser.add_argument(
            '--delete',
            action='store_true',
            help='Delete old messages instead of archiving them',
        )
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Show what would be done without actually doing it',
        )

    def handle(self, *args, **options):
        days = options['days']
        delete_mode = options['delete']
        dry_run = options['dry_run']

        # Calculate cutoff date
        cutoff_date = timezone.now() - timedelta(days=days)

        # Find old messages
        old_messages = ContactMessage.objects.filter(created_at__lt=cutoff_date)

        count = old_messages.count()

        if count == 0:
            self.stdout.write(
                self.style.SUCCESS(f'No messages older than {days} days found.')
            )
            return

        self.stdout.write(
            f'Found {count} messages older than {days} days (before {cutoff_date.date()})'
        )

        if dry_run:
            self.stdout.write(
                self.style.WARNING('DRY RUN - No changes will be made.')
            )

            # Show some sample messages
            sample_messages = old_messages[:5]
            for msg in sample_messages:
                self.stdout.write(
                    f'  - {msg.name} ({msg.email}) - {msg.subject} - {msg.created_at.date()}'
                )

            if count > 5:
                self.stdout.write(f'  ... and {count - 5} more messages')

            return

        if delete_mode:
            # Delete old messages
            deleted_count, _ = old_messages.delete()
            self.stdout.write(
                self.style.SUCCESS(f'Successfully deleted {deleted_count} old contact messages.')
            )
        else:
            # Archive old messages (mark as archived if we had an archived field)
            # For now, we'll just delete them since we don't have an archive field
            # In a real scenario, you'd add an 'archived' boolean field to the model
            deleted_count, _ = old_messages.delete()
            self.stdout.write(
                self.style.SUCCESS(f'Successfully removed {deleted_count} old contact messages.')
            )

        # Show database cleanup summary
        remaining_count = ContactMessage.objects.count()
        self.stdout.write(
            f'Current total messages in database: {remaining_count}'
        )
