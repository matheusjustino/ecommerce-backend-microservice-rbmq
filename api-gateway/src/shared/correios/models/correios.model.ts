import {
	IsBoolean,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';

export class CalculateShippingModel {
	@IsString()
	@IsNotEmpty()
	public nCdServico: string;

	@IsString()
	@IsNotEmpty()
	public sCepOrigem: string;

	@IsString()
	@IsNotEmpty()
	public sCepDestino: string;

	@IsString()
	@IsNotEmpty()
	public nVlPeso: string;

	@IsNumber()
	@IsNotEmpty()
	public nCdFormato: number;

	@IsNumber()
	@IsNotEmpty()
	public nVlComprimento: number;

	@IsNumber()
	@IsNotEmpty()
	public nVlAltura: number;

	@IsNumber()
	@IsNotEmpty()
	public nVlLargura: number;

	@IsNumber()
	@IsNotEmpty()
	public nVlDiametro: number;
}

export class VerifyCepResponseSuccessModel {
	@IsString()
	@IsNotEmpty()
	public cep: string;

	@IsString()
	@IsNotEmpty()
	public logradouro: string;

	@IsString()
	@IsNotEmpty()
	public complemento: string;

	@IsString()
	@IsNotEmpty()
	public bairro: string;

	@IsString()
	@IsNotEmpty()
	public localidade: string;

	@IsString()
	@IsNotEmpty()
	public uf: string;

	@IsString()
	@IsNotEmpty()
	public ibge: string;

	@IsString()
	@IsNotEmpty()
	public gia: string;

	@IsString()
	@IsNotEmpty()
	public ddd: string;

	@IsString()
	@IsNotEmpty()
	public siafi: string;
}

export class VerifyCepResponseErrorModel {
	@IsBoolean()
	@IsOptional()
	public erro?: boolean;

	@IsNumber()
	@IsOptional()
	public Erro?: number;

	@IsString()
	@IsOptional()
	public MsgErro?: string;
}

export class CalculateShippingResponseModel {
	@IsNumber()
	@IsNotEmpty()
	public codigo: number;

	@IsString()
	@IsNotEmpty()
	public Valor: string;

	@IsString()
	@IsNotEmpty()
	public ValorMaoPropria: string;

	@IsString()
	@IsNotEmpty()
	public ValorAvisoRecebimento: string;

	@IsString()
	@IsNotEmpty()
	public ValorValorDeclarado: string;

	@IsString()
	@IsNotEmpty()
	public Erro: string;

	@IsString()
	@IsNotEmpty()
	public MsgErro: string;

	@IsString()
	@IsNotEmpty()
	public ValorSemAdicionais: string;
}

export class CalculateShippingAndDeadlineResponseModel {
	@IsNumber()
	@IsNotEmpty()
	public codigo: number;

	@IsString()
	@IsNotEmpty()
	public Valor: string;

	@IsString()
	@IsNotEmpty()
	public PrazoEntrega: string;

	@IsString()
	@IsNotEmpty()
	public ValorMaoPropria: string;

	@IsString()
	@IsNotEmpty()
	public ValorAvisoRecebimento: string;

	@IsString()
	@IsNotEmpty()
	public ValorValorDeclarado: string;

	@IsString()
	@IsNotEmpty()
	public EntregaDomiciliar: string;

	@IsString()
	@IsNotEmpty()
	public EntregaSabado: string;

	@IsString()
	@IsNotEmpty()
	public Erro: string;

	@IsString()
	@IsNotEmpty()
	public MsgErro: string;

	@IsString()
	@IsNotEmpty()
	public ValorSemAdicionais: string;

	@IsString()
	@IsNotEmpty()
	public obsFim: string;
}
