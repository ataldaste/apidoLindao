from django.db import models

class CadastroProfessor(models.Model):
    ni = models.CharField(max_length=15)
    nome = models.CharField(max_length=255)
    email = models.EmailField()
    cel = models.CharField(max_length=255)
    ocup = models.FloatField()
    

class CadastroDisciplina(models.Model):
    disciplina = models.CharField(max_length=255)
    sigla = models.CharField(max_length=10)
    curso = models.CharField(max_length=100)
    semestre = models.IntegerField()
    carga_horaria = models.IntegerField()

class CadastroAmbiente(models.Model):
    codigo = models.CharField(max_length=10)
    sala = models.CharField(max_length=255)
    capacidade = models.IntegerField()
    responsavel =  models.CharField(max_length=100)
    escolhas = (
        ("M", "MANHÃ"),
        ("T", "TARDE"),
        ("N", "NOITE"),
        ("S", "SABADO")
    ) 
    periodo = models.CharField(max_length=10, choices = escolhas)

class CadastroTurma(models.Model):
    codigoTurma = models.CharField(max_length=10)
    turma = models.IntegerField()

class CadastroCurso(models.Model):
    codigoCurso = models.IntegerField()
    curso = models.CharField(max_length=100)
    tipo = models.CharField(max_length=10)
    ha = models.FloatField()
    sigla = models.CharField(max_length=10)