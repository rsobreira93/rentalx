# Cadastro de carro

**RF**
Deve ser possivel cadastrar um novo carro
Deve ser poossivel listar todas as categorias

**RN**
Não deve ser possivel cadastrar um carro com uma placa já existente
Não deve ser possivel alterar a placa de um carro já cadastrado
O carro deve ser cadastrado com disponibilidade por padrão
Somente um adm deve ser poossivel cadastrar um carro

# Listagem de carro

**RF**
Deve ser possivel fazer a listagem dos carros disponiveis
Deve ser possivel fazer a listagem dos carros disponiveis pelo nome da categoria
Deve ser possivel fazer a listagem dos carros disponiveis pelo nome da marca
Deve ser possivel fazer a listagem dos carros disponiveis pelo nome do carro

**RN**
O usuario não precisa estar rlogado no sistema.

# Cadastro de especificação no carro

**RF**
Deve ser possivel cadastrar a especificação de um carro.
Deve ser possivel listar todas as epecificações
Deve ser possivel listar todos os carros.

**RN**
Só deve ser possivel cadastrar uma especificação se o carro estiver cadastrado no sistema
Não deve ser possivel cadastar uma especificação já existente para o msm carro.
Uma especificação só pode ser salva por um adm.

# Cadastro de imagens do carro

**RF**
Deve ser possivel cadastrar a imagem do carro

**RNF**
Utilizar o multer para upload dos arquivos.

**RN**
O usuario deve poder cadastrar mais de uma imagem para o carro
O usuatio deve ser um adm para poder cadastrar as imagens

# Alguel de carro

**RF**
Deve ser possivel cadastrar um aluguel

**RN**
O aluguel devee duração minima de 24 horas
Não deve ser possivel cadas um novo aluguel caso já exista um aberto para o msm usuario
Não deve ser possivel cadas um novo aluguel caso já exista um aberto para o msm carro
