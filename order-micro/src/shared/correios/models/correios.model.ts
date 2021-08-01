export class CalculateShippingModel {
	public nCdServico: string;
	public sCepOrigem: string;
	public sCepDestino: string;
	public nVlPeso: string;
	public nCdFormato: number;
	public nVlComprimento: number;
	public nVlAltura: number;
	public nVlLargura: number;
	public nVlDiametro: number;
}

export class VerifyCepResponseSuccessModel {
	public cep: string;
	public logradouro: string;
	public complemento: string;
	public bairro: string;
	public localidade: string;
	public uf: string;
	public ibge: string;
	public gia: string;
	public ddd: string;
	public siafi: string;
}

export class VerifyCepResponseErrorModel {
	public erro?: boolean;
	public Erro?: number;
	public MsgErro?: string;
}

export class CalculateShippingResponseModel {
	public codigo: number;
	public Valor: string;
	public ValorMaoPropria: string;
	public ValorAvisoRecebimento: string;
	public ValorValorDeclarado: string;
	public Erro: string;
	public MsgErro: string;
	public ValorSemAdicionais: string;
}

export class CalculateShippingAndDeadlineResponseModel {
	public codigo: number;
	public Valor: string;
	public PrazoEntrega: string;
	public ValorMaoPropria: string;
	public ValorAvisoRecebimento: string;
	public ValorValorDeclarado: string;
	public EntregaDomiciliar: string;
	public EntregaSabado: string;
	public Erro: string;
	public MsgErro: string;
	public ValorSemAdicionais: string;
	public obsFim: string;
}
