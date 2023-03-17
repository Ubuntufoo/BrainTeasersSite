from django.db import models
from users.models import CustomUser
from django.core.validators import MaxValueValidator, MinValueValidator


class UserReviews(models.Model):

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    rating = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.rating} stars - {self.comment}"
