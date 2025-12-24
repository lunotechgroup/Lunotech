from django.db import models
from django.utils.text import slugify
from django.urls import reverse
from django.core.files.base import ContentFile
from PIL import Image
import io
from django.core.files.storage import default_storage

class Category(models.Model):
    name_fa = models.CharField(max_length=100)
    name_en = models.CharField(max_length=100)
    slug = models.SlugField(max_length=120, unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name_en)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name_en

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"


class Blog(models.Model):
    # Core Content
    title_fa = models.CharField(max_length=200)
    title_en = models.CharField(max_length=200)
    subtitle_fa = models.CharField(max_length=300)
    subtitle_en = models.CharField(max_length=300)
    description_fa = models.TextField()
    description_en = models.TextField()
    slug = models.SlugField(max_length=220, unique=True, help_text="A unique URL-friendly path for the blog post.")

    # Metadata
    date = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='blog_images/')
    is_selected = models.BooleanField(default=False, help_text="Check this to include the blog in the 'selected' list.")
    
    # Relationships
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='blogs')
    
    # Creator Info
    creator_name = models.CharField(max_length=100)
    creator_title = models.CharField(max_length=100)

    def __str__(self):
        return self.title_en
    
    def get_absolute_url(self):
        return reverse("blog_detail" , kwargs={"slug": self.slug})

    def save(self, *args, **kwargs):
        # Auto-generate slug if not provided
        if not self.slug:
            self.slug = slugify(self.title_en)

        # Process image on save
        if self.image and hasattr(self.image, 'file'):
            self.process_image()

        super().save(*args, **kwargs)

    def process_image(self):
        """Resize image to max 1200px width and convert to WebP format"""
        try:
            # Open the image
            img = Image.open(self.image)

            # Convert to RGB if necessary (for PNG with transparency)
            if img.mode in ('RGBA', 'LA', 'P'):
                # Create white background for transparency
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1])  # Use alpha channel as mask
                img = background
            elif img.mode != 'RGB':
                img = img.convert('RGB')

            # Calculate new dimensions (max 1200px width)
            max_width = 1200
            if img.width > max_width:
                ratio = max_width / img.width
                new_height = int(img.height * ratio)
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)

            # Save as WebP with high quality
            buffer = io.BytesIO()
            img.save(buffer, format='WebP', quality=85, optimize=True)
            buffer.seek(0)

            # Generate new filename with .webp extension
            original_name = self.image.name
            if '.' in original_name:
                name_without_ext = original_name.rsplit('.', 1)[0]
            else:
                name_without_ext = original_name
            new_name = f"{name_without_ext}.webp"

            # Save the processed image
            self.image.save(new_name, ContentFile(buffer.getvalue()), save=False)

        except Exception as e:
            # Log the error but don't fail the save operation
            import logging
            logger = logging.getLogger(__name__)
            logger.warning(f"Failed to process image {self.image.name}: {str(e)}")

    class Meta:
        ordering = ['-date'] # Show newest blogs first


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} on {self.created_at.strftime('%Y-%m-%d')}"