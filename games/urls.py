from django.urls import path

from games.views import HomeView, MathGameView, AnagramGameView, WordleGameView, GameScoresView, ContactUsView, record_score

app_name = 'games'
urlpatterns = [
    path('', HomeView.as_view(), name='homepage'),
    path('contact-us/',  ContactUsView.as_view(), name='contact-us'),
    path('math-game/', MathGameView.as_view(), name='math-game'),
    path('anagram-game/', AnagramGameView.as_view(), name='anagram-game'),
    path('wordle-game/', WordleGameView.as_view(), name='wordle-game'),
    path('game-scores/',  GameScoresView.as_view(), name='game-scores'),
    path('record-score/', record_score, name='record-score')
]
