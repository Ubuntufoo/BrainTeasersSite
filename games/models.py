from django.db import models


class GameScore(models.Model):

    MATH = "MATH"
    ANAGRAM = "ANAGRAM"

    GAME_CHOICES = [
        (MATH, "Math Game"),
        (ANAGRAM, "Anagram Game")
    ]

    user_name = models.TextField()
    game = models.TextField()
    score = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
