from rest_framework import serializers
from .models import CadastroProfessor, CadastroDisciplina, CadastroAmbiente, CadastroCurso, CadastroTurma

class CadastroProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CadastroProfessor
        fields = '__all__'

class CadastroDisciplinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CadastroDisciplina
        fields = '__all__'


class CadastroAmbienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CadastroAmbiente
        fields = '__all__'


class CadastroTurmaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CadastroTurma
        fields = '__all__'


class CadastroCursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CadastroCurso
        fields = '__all__'



