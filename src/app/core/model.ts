
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
  rg: string;
  endereco = new Endereco();
  ativo = true;
  telefone: string;
}

export class Prontuario {
  codigo: number;
  receita: string;
  relatorio: string;
  paciente = new Paciente();
  anexo: string;
  urlAnexo: string;
}

export class Solicitacao {
  codigo: number;
  descricao: string;
  agenda = new Agenda();
  paciente = new Paciente();
  data: Date;
  tipo = 'CANCELAMENTO';
  anexo: string;
  urlAnexo: string;
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

export class Permissao {
  codigo: number;
}

export class Perfil {
  codigo: number;
  usuario = new Usuario();
  permissao = new Permissao();
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

export class Horario {
  codigo: number;
}

export class Agenda {
  codigo: number;
  ativo = true;
  data: Date;
  hora: string;
  medico = new Medico();
  paciente = new Paciente();
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
  cpf: string;
  especializacao: string;
  crm: string;
}

export class Funcionario {
  codigo: number;
  pessoa = new Pessoa();
  nome: string;
  cpf: string;
  cargo: string;
  setor: string;
  dataAdmissao: Date;
}

export class Paciente {
  codigo: number;
  pessoa = new Pessoa();
  nome: string;
  cpf: string;
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




