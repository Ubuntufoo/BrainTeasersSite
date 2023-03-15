import json
from django.http import JsonResponse
from games.models import GameScore

from django.views.generic import TemplateView, ListView


def record_score(request):
    data = json.loads(request.body)

    user_name = data["user-name"]
    game = data["game"]
    score = data["score"]

    new_score = GameScore(user_name=user_name, game=game, score=score)
    new_score.save()

    response = {
        "success": True
    }

    return JsonResponse(response)


class GameScoresView(ListView):

    model = GameScore

    template_name = "game-scores.html"

    def get_context_data(self, **kwargs):
        context = super(GameScoresView, self).get_context_data(**kwargs)
        context['anagram_scores'] = GameScore.objects.filter(
            game__exact='ANAGRAM').order_by('-score')
        context['math_scores'] = GameScore.objects.filter(
            game__exact='MATH').order_by('-score')
        return context


class LoginView(TemplateView):
    template_name = "login.html"


class ContactUsView(TemplateView):
    template_name = "contact-us.html"


class MyAccountView(TemplateView):
    template_name = "my-account.html"


class HomeView(TemplateView):
    template_name = "home.html"


class MathGameView(TemplateView):
    template_name = "math-game.html"


class AnagramGameView(TemplateView):
    template_name = "anagram-game.html"
