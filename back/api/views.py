from django.shortcuts import render
from .models import CadastroProfessor, CadastroDisciplina, CadastroAmbiente, CadastroCurso, CadastroTurma
from .serializer import CadastroProfessorSerializer, CadastroDisciplinaSerializer, CadastroAmbienteSerializer, CadastroCursoSerializer, CadastroTurmaSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.response import Response
from django.contrib.auth.models import User






@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def listar_professores(request):
    if request.method == 'GET':
        queryset = CadastroProfessor.objects.all()
        serializer = CadastroProfessorSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CadastroProfessorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def buscar_nome_professor(request):
    termo = request.get('nome', '')
    if termo:
        professores = CadastroProfessor.objects.filter(nome_incontains = termo)
    else:
        professores = CadastroProfessor.objects.all()
    
    serializer = CadastroProfessorSerializer(professores, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def register_user(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response({"error": "Preencha todos os campos"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Usuário já existe"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    user.save()

    return Response({"message": "Usuário criado com sucesso"}, status=status.HTTP_201_CREATED)




class ProfessoresView(ListCreateAPIView):
    queryset = CadastroProfessor.objects.all()
    serializer_class = CadastroProfessorSerializer
    permission_classes = [IsAuthenticated]

class ProfessoresDetailView(RetrieveUpdateDestroyAPIView):
    queryset = CadastroProfessor.objects.all()
    serializer_class = CadastroProfessorSerializer
    permission_classes = [IsAuthenticated]

class ProfessoresSearchView(ListAPIView):
    queryset = CadastroProfessor.objects.all()
    serializer_class = CadastroProfessorSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['nome']

class DisciplinasView(ListCreateAPIView):
    queryset = CadastroDisciplina.objects.all()
    serializer_class = CadastroDisciplinaSerializer
    permission_classes = [IsAuthenticated]

class DisciplinasDetailView(RetrieveUpdateDestroyAPIView):
    queryset = CadastroDisciplina.objects.all()
    serializer_class = CadastroDisciplinaSerializer
    permission_classes = [IsAuthenticated]

class AmbienteView(ListCreateAPIView):
    queryset = CadastroAmbiente.objects.all()
    serializer_class = CadastroAmbienteSerializer
    permission_classes = [IsAuthenticated]

class AmbienteDetailView(RetrieveUpdateDestroyAPIView):
    queryset = CadastroAmbiente.objects.all()
    serializer_class = CadastroAmbienteSerializer
    permission_classes = [IsAuthenticated]

class CursoView(ListCreateAPIView):
    queryset = CadastroCurso.objects.all()
    serializer_class = CadastroCursoSerializer
    permission_classes = [IsAuthenticated]

class CursoDetailView(RetrieveUpdateDestroyAPIView):
    queryset = CadastroCurso.objects.all()
    serializer_class = CadastroCursoSerializer
    permission_classes = [IsAuthenticated]

class TurmaView(ListCreateAPIView):
    queryset = CadastroTurma.objects.all()
    serializer_class = CadastroTurmaSerializer
    permission_classes = [IsAuthenticated]

class TurmaDetailView(RetrieveUpdateDestroyAPIView):
    queryset = CadastroTurma.objects.all()
    serializer_class = CadastroTurmaSerializer
    permission_classes = [IsAuthenticated]

