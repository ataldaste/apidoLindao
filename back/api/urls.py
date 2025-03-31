from django.urls import path
from .views import listar_professores, ProfessoresView, ProfessoresDetailView, buscar_nome_professor, ProfessoresSearchView, DisciplinasView, DisciplinasDetailView, AmbienteView, AmbienteDetailView, TurmaView, TurmaDetailView, CursoView, CursoDetailView, register_user
from rest_framework_simplejwt.views import (
        TokenObtainPairView,
        TokenRefreshView,
    )

urlpatterns = [
    path('professores', listar_professores),
    path('prof', ProfessoresView.as_view()),
    path('professores/<int:pk>', ProfessoresDetailView.as_view(), name='professores-detail'),
    path('id/<int:pk>', ProfessoresDetailView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('buscar/nome/', buscar_nome_professor),
    path('search/', ProfessoresSearchView.as_view()),
    path('disciplinas', DisciplinasView.as_view(), name='disciplinas-list-create'),
    path('disciplinas/<int:pk>', DisciplinasDetailView.as_view(), name='disciplinas-detail'),
    path('ambientes', AmbienteView.as_view()),
    path('ambientes/<int:pk>', AmbienteDetailView.as_view(), name='ambiente-detail'),
    path('turmas', TurmaView.as_view()),
    path('turmas/<int:pk>', TurmaDetailView.as_view(), name='turma-detail'),
    path('cursos', CursoView.as_view()),
    path('cursos/<int:pk>', CursoDetailView.as_view(), name='curso-detail'),
    path('register', register_user, name="register")

    ]

