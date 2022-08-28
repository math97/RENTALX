**RF** => Requisitos funcionais
**RNF** => Requisitos não funcionais
**RN** => Regras de negócio

# Cadastro de carro

**RF**
Deve ser possível cadastrar um novo carro.
Deve ser possível listar todas as categorias

**RN**
Não deve ser possível cadastrar um carro com uma placa ja existente.
Não deve ser possível alterar a placa um carro já cadastrado.
Carro deve ser cadastrado, por padrão ciom disponibilidade.
O usuário responsável pelo cadastro deve ser um administrador

# Listagem de carro

**RF**
Deve ser possível listar os carros disponíveis
Deve ser possível listar todos os carros disponíveis pelo nome da categoria
Deve ser possível listar todos os carros disponíveis pelo nome da marca
Deve ser possível listar todos os carros disponíveis pelo nome do carro

**RN**
Usuário não precisa estar logado no sistema

# Cadastro de especificação no carro

**RF**
Deve ser possível cadastrar uma especificação para um carro
Deve ser possível listar todas as especificações
Deve ser possível listar todos os carros

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastro
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro
O usuário responsável pelo cadastro deve ser um administrador

# Cadastro de imagem do carro

**RF**
Deve ser possível cadastrar a imagem do carro
Deve ser possível listar todos os carro

**RFN**
Utilizar o multer para upload dos arquivos

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
O usuário responsável pelo cadastro deve ser um administrador

# Aluguel de carro

**RF**
Deve ser possível cadastrar um aluguel

**RN**
O aluguel deve ter duração miníma de 24h
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
