import json
from django.http import JsonResponse
from django.urls import reverse_lazy
from games.models import GameScore
from reviews.models import UserReview
from django.views.generic import TemplateView, ListView, CreateView
from django.contrib.auth.mixins import LoginRequiredMixin

from reviews.models import UserReview


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


class GameScoresView(LoginRequiredMixin, ListView):

    model = GameScore

    template_name = "game-scores.html"

    def get_context_data(self, **kwargs):
        context = super(GameScoresView, self).get_context_data(**kwargs)
        user = self.request.user
        context['anagram_scores'] = GameScore.objects.filter(
            game__exact='ANAGRAM').order_by('-score')
        context['math_scores'] = GameScore.objects.filter(
            game__exact='MATH').order_by('-score')
        context['user_anagram_scores'] = GameScore.objects.filter(
            user=user, game__exact='ANAGRAM').order_by('-score')
        context['user_math_scores'] = GameScore.objects.filter(
            user=user, game__exact='MATH').order_by('-score')
        return context


class LoginView(TemplateView):
    template_name = "login.html"


class ContactUsView(TemplateView):
    template_name = "contact-us.html"


class MyAccountView(TemplateView):
    template_name = "my-account.html"


class HomeView(CreateView):

    model = UserReview
    fields = ['rating', 'comment']

    template_name = "home.html"
    success_url = reverse_lazy('games:homepage')

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        reviews = UserReview.objects.all()
        context['reviews'] = reviews
        return context


class MathGameView(TemplateView):
    template_name = "math-game.html"


class AnagramGameView(TemplateView):
    template_name = "anagram-game.html"
