export class Estado {
  codigo: number;
  nome: string;
}

export class Cidade {
  codigo: number;
  nome: string;
  estado = new Estado();
}

export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade = new Cidade();
}

export class Pessoa {
  codigo: number;
  nome: string;
  endereco = new Endereco();
  ativo = true;
  telefone: string;
}

export class Prontuario {
  codigo: number;
  exame: string;
  receita: string;
  relatorio: string;
  paciente = new Paciente();
}

export class Usuario {
  codigo: number;
  primeiroNome: string;
  sobrenome: string;
  email: string;
  ativo = true;
  senha: string;
  confirmeSenha: string;
}

export class Medicacao {
  codigo: number;
}

export class TipoExame {
  codigo: number;
}

export class Categoria {
  codigo: number;
}

export class Receita {
  codigo: number;
  descricao: string;
  medicacao = new Medicacao();
  medico = new Medico();
  paciente = new Paciente();
}

export class Exame {
  codigo: number;
  descricao: string;
  tipoExame = new TipoExame();
  medico = new Medico();
  paciente = new Paciente();
}

export class Medico {
  codigo: number;
  pessoa = new Pessoa();
  nome: string;
  especializacao: string;
  crm: string;
}

export class Funcionario {
  codigo: number;
  pessoa = new Pessoa();
  nome: string;
  cargo: string;
  setor: string;
  dataAdmissao: Date;
}

export class Paciente {
  codigo: number;
  pessoa = new Pessoa();
  nome: string;
  categoria = new Categoria();
}

export class Lancamento {
  codigo: number;
  descricao: string;
  dataConsulta: Date;
  dataExame: Date;
  valor: number;
  tipo = 'CONSULTA';
  observacao: string;
  pessoa = new Pessoa();
  exame = new Exame();
  anexo: string;
  urlAnexo: string;
}




