import { EntitiesEnum } from '@interfaces/enum/entities.enum';

export const CONTENT_TYPE_JSON = 'application/json';
export const CONTENT_TYPE_TEXT = 'text/plain';
export const PASSWORD_SALT = 'salt@sjbC@wC@cz@!7C6A6';
export const JWT_SECRET = 'jR356vkYC6BBU@h7HbaNsAGdn&^5B2kg4HVVJSQhcNzsnb@QPU2H!&uZSQJRpk3!ZqE';
export const ITEM_DELETED = 'Item foi apagado com sucesso';
export const ITEM_UPDATED = 'Item foi alterado com sucesso';

export const VALUE_NOT_FOUND = (entity: string) => `${entity} não encontrada(o).`;

export const JOI_TRANSLATE_MESSAGES = {
  'alternatives.all': '{{#label}} não corresponde a todos os tipos requeridos',
  'alternatives.any': '{{#label}} não corresponde a qualquer um dos tipos permitidos',
  'alternatives.match': '{{#label}} não corresponde a qualquer um dos tipos permitidos',
  'alternatives.one': '{{#label}} corresponde a mais de um tipo permitido',
  'alternatives.types': '{{#label}} deve ser do tipo {{#types}}',

  'any.custom': '{{#label}} falha na validação personalizada porque {{#error.message}}',
  'any.default': '{{#label}} gerou um erro ao executar o método padrão',
  'any.failover': '{{#label}} gerou um erro ao executar o método de tolerância de falhas ',
  'any.invalid': '{{#label}} contém um valor inválido',
  'any.only': '{{#label}} deve ser {if(#valids.length == 1, "", "um de ")}{{#valids}}',
  'any.ref': '{{#label}} {{#arg}} se refere a "{{#ref}}" tal que {{#reason}}',
  'any.required': '{{#label}} é requerido',
  'any.unknown': '{{#label}} não é permitido',

  'array.base': '{{#label}} deve ser um array',
  'array.excludes': '{{#label}} contém um valor excluído',
  'array.hasKnown':
    '{{#label}} não contém ao menos uma correspondência necessária para o tipo "{#patternLabel}"',
  'array.hasUnknown': '{{#label}} não contém ao menos um campo reque',
  'array.includes': '{{#label}} não corresponde a qualquer um dos tipos permitidos',
  'array.includesRequiredBoth':
    '{{#label}} não contém {{#knownMisses}} e {{#unknownMisses}} outro(s) valore(s) requerido(s)',
  'array.includesRequiredKnowns': '{{#label}} não contém {{#knownMisses}}',
  'array.includesRequiredUnknowns':
    '{{#label}} não contém {{#unknownMisses}} valor(es) requerido(s)',
  'array.length': '{{#label}} deve conter {{#limit}} itens',
  'array.max': '{{#label}} deve ser menor ou igual a {{#limit}} itens',
  'array.min': '{{#label}} deve conter ao menos {{#limit}} itens',
  'array.orderedLength': '{{#label}} deve conter no máximo {{#limit}} itens',
  'array.sort': '{{#label}} deve ser classificado em {#order} por {{#by}}',
  'array.sort.mismatching': '{{#label}} não pôde ser classificado devido a tipos incompatíveis',
  'array.sort.unsupported':
    '{{#label}} não pôde ser classificado devido a tipos não suportados {#type}',
  'array.sparse': '{{#label}} o array possui uma grande quantidade de valores nulos ou 0',
  'array.unique': '{{#label}} contém um valor duplicado',

  'binary.base': '{{#label}} deve ser um buffer ou uma string',
  'binary.length': '{{#label}} deve ser {{#limit}} bytes',
  'binary.max': '{{#label}} deve ser menor ou igual a {{#limit}} bytes',
  'binary.min': '{{#label}} deve ter ao menos {{#limit}} bytes',

  'boolean.base': '{{#label}} deve ser um boolean',

  'date.base': '{{#label}} deve ser uma data válida',
  'date.format': '{{#label}} deve estar no formato {msg("date.format." + #format) || #format}',
  'date.greater': '{{#label}} deve ser maior que "{{#limit}}"',
  'date.less': '{{#label}} deve ser menor que "{{#limit}}"',
  'date.max': '{{#label}} deve ser menor ou igual a "{{#limit}}"',
  'date.min': '{{#label}} deve ser maior ou igual a "{{#limit}}"',

  'date.format.iso': 'Data ISO 8601',
  'date.format.java': 'timestamp ou number em milisegundos',
  'date.format.unix': 'timestamp ou number em segundos',

  'function.arity': '{{#label}} deve ter {{#n}} argumentos',
  'function.class': '{{#label}} deve ser uma classe',
  'function.maxArity':
    '{{#label}} deve ter uma quantidade de argumentos menor ou iguais a {{#n}}',
  'function.minArity':
    '{{#label}} deve ter uma quantidade de argumentos maior ou iguais a {{#n}}',

  'object.and':
    '{{#label}} contém {{#presentWithLabels}} sem seus pares necessários {{#missingWithLabels}}',
  'object.assert':
    '{{#label}} é inválido porque {if(#subject.key, `"` + #subject.key + `" falhou ao ` + (#message || "passar no teste de assertion "), #message || "a assertion  falhou")}',
  'object.base': '{{#label}} deve ser do tipo {{#type}}',
  'object.instance': '{{#label}} deve ser uma instância de "{{#type}}"',
  'object.length': '{{#label}} deve conter {{#limit}} key{if(#limit == 1, "", "s")}',
  'object.max': '{{#label}} deve ser menor ou igual a {{#limit}} key{if(#limit == 1, "", "s")}',
  'object.min': '{{#label}} deve conter ao menos {{#limit}} key{if(#limit == 1, "", "s")}',
  'object.missing': '{{#label}} deve conter ao menos {{#peersWithLabels}}',
  'object.nand':
    '"{{#mainWithLabel}}" não deve existir simultaneamente com {{#peersWithLabels}}',
  'object.oxor':
    '{{#label}} contém um conflito entre pares opcionais exclusivos {{#peersWithLabels}}',
  'object.pattern.match': '{{#label}} chaves falharam em atender aos requisitos padrões',
  'object.refType': '{{#label}} deve ser uma referência Joi',
  'object.regex': '{{#label}} deve ser um objeto RegExp',
  'object.rename.multiple':
    '{{#label}} não pôde renomear "{{#from}}" porque várias renomeações estão desabilitadas e outra chave já foi renomeada para "{{#to}}"',
  'object.rename.override':
    '{{#label}} não pôde renomear "{{#from}}" porque a substituição está desativada e o destino "{{#to}}" já existe',
  'object.schema': '{{#label}} deve ser um Joi schema do tipo {{#type}}',
  'object.unknown': '{{#label}} não é permitido',
  'object.with': '"{{#mainWithLabel}}" falta do par necessário "{{#peerWithLabel}}"',
  'object.without': '"{{#mainWithLabel}}" conflito com um par proibido "{{#peerWithLabel}}"',
  'object.xor': '{{#label}} contém um conflito entre pares exclusivos {{#peersWithLabels}}',

  'number.base': '{{#label}} deve ser um número',
  'number.greater': '{{#label}} deve ser maior que {{#limit}}',
  'number.infinity': '{{#label}} não pode ser infinito',
  'number.integer': '{{#label}} deve ser um inteiro',
  'number.less': '{{#label}} deve ser menor que {{#limit}}',
  'number.max': '{{#label}} deve ser menor ou igual à {{#limit}}',
  'number.min': '{{#label}} deve ser maior ou igual à {{#limit}}',
  'number.multiple': '{{#label}} deve ser um multiplo de {{#multiple}}',
  'number.negative': '{{#label}} deve ser um número negativo',
  'number.port': '{{#label}} deve ser uma porta válida',
  'number.positive': '{{#label}} deve ser um número positivo',
  'number.precision': '{{#label}} não deve ter mais do que {{#limit}} casas decimais',
  'number.unsafe': '{{#label}} deve ser um número seguro',

  'string.alphanum': '{{#label}} deve conter apenas caracteres alfanuméricos',
  'string.base': '{{#label}} deve ser uma string',
  'string.base64': '{{#label}} deve ser uma string base64 válida',
  'string.creditCard': '{{#label}} deve ser um cartão de crédito válido',
  'string.dataUri': '{{#label}} deve ser uma dataUri',
  'string.domain': '{{#label}} deve conter um domínio válido',
  'string.email': '{{#label}} deve ser um email válido',
  'string.empty': '{{#label}} não é permitido ser vazio',
  'string.guid': '{{#label}} deve ser um GUID válido',
  'string.hex': '{{#label}} deve conter apenas caracteres hexa decimais',
  'string.hexAlign':
    '{{#label}} a representação decodificada do hexadecimal deve ser alinhada por bytes',
  'string.hostname': '{{#label}} deve ser um hostname válido',
  'string.ip': '{{#label}} deve ser um endereço de IP válido com o CIDR {{#cidr}} ',
  'string.ipVersion':
    '{{#label}} deve ser um endereço de IP válido com a versão {{#version}} e o CIDR {{#cidr}}',
  'string.isoDate': '{{#label}} deve ser um formato ISO',
  'string.isoDuration': '{{#label}} deve ser uma ISO 8601',
  'string.length': '{{#label}} deve conter exatamente {{#limit}} caracteres',
  'string.lowercase': '{{#label}} deve conter apenas letras minusculas',
  'string.max': '{{#label}} deve conter {{#limit}} ou menos caracteres',
  'string.min': '{{#label}} deve conter pelo menos {{#limit}} caracteres',
  'string.normalize': '{{#label}} deve ser do tipo unicode {{#form}}',
  'string.token': '{{#label}} deve conter apenas caracteres alfanuméricos  e underline',
  'string.pattern.base':
    '{{#label}} com valor "{[.]}" falhou em comparar com o padrão requerido: {{#regex}}',
  'string.pattern.name':
    '{{#label}} com valor "{[.]}" falho em comparar com o {{#name}} padrão',
  'string.pattern.invert.base':
    '{{#label}} com valor "{[.]}" não corresponde ao valor padrão invertido: {{#regex}}',
  'string.pattern.invert.name':
    '{{#label}} com o valor "{[.]}" não corresponde ao valor invertido {{#name}} padrão',
  'string.trim': '{{#label}} não deve ter espaços em branco à esquerda ou à direita',
  'string.uri': '{{#label}} deve ser uma url válida.',
  'string.uriCustomScheme':
    '{{#label}} deve ser uma url válida com um esquema que corresponda ao {{#scheme}} padrão',
  'string.uriRelativeOnly': '{{#label}} deve ser uma url relativa válida',
  'string.uppercase': '{{#label}} deve conter apenas caracteres maiúsculos',

  'symbol.base': '{{#label}} deve ser um símbolo be a symbol',
  'symbol.map': '{{#label}} deve ser um dos {{#map}}'
};
