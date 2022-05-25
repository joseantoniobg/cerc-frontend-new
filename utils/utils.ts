import { notification } from 'antd';
import cookie from "cookie";

import React from 'react';
import moment from 'moment';
import localization from 'moment/locale/pt-br';

const openNotificationWithIcon = (type: string, message: string, description: string) => {
  notification[type]({
    message,
    description
  });
};

export const msgSuccess = (message: string, description: string) => {
  openNotificationWithIcon('success', message, description);
}

export const msgInfo = (message: string, description: string) => {
  openNotificationWithIcon('info', message, description);
}

export const msgWarning = (message: string, description: string) => {
  openNotificationWithIcon('warning', message, description);
}

export const msgError = (message: string, description: string) => {
  openNotificationWithIcon('error', message, description);
}

export function parseCookies(req) {
  return cookie.parse(req?.headers?.cookie ?? "");
}

export function getNumbersFromString(str: string): string {
  const res = str.replace(/\D/g, "");
  return res;
}

export function hasRole(user, role: string): boolean {
  return role === '' || user?.roles?.find(userRole => userRole.unique_key === role);
}

export const valorValido = valor => {
  if (valor !== undefined && valor !== null) {
    if (Array.isArray(valor)) {
      return Array.from(valor).length > 0;
    }

    if (typeof valor === 'object') {
      return Object.values(valor).length > 0;
    }

    if (typeof valor === 'string') {
      return valor !== '';
    }
    return true;
  }
  return false;
};

export const validarCnpj = valor => {
  if (!valor) return;
  const cnpj = valor.replace(/[^\d]+/g, '');

  if (cnpj === '') return false;

  if (cnpj.length !== 14) {
    return false;
  }

  if (
    cnpj === '00000000000000' ||
    cnpj === '11111111111111' ||
    cnpj === '22222222222222' ||
    cnpj === '33333333333333' ||
    cnpj === '44444444444444' ||
    cnpj === '55555555555555' ||
    cnpj === '66666666666666' ||
    cnpj === '77777777777777' ||
    cnpj === '88888888888888' ||
    cnpj === '99999999999999'
  ) {
    return false;
  }

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== Number(digitos.charAt(0))) {
    return false;
  }

  tamanho += 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== Number(digitos.charAt(1))) {
    return false;
  }

  return true;
};

export const validarCpf = valor => {
  if (!valor) return;
  const cpf = valor.replace(/[^\d]+/g, '');

  const sequenciaNumerosIguais = /^(\d)\1+$/; // Ex: 11111111111

  if (cpf === '') return false;
  // Elimina CPFs invalidos conhecidos
  if (cpf.length !== 11 || sequenciaNumerosIguais.test(cpf)) {
    return false;
  }
  // Valida 1o digito
  let add = 0;
  for (let i = 0; i < 9; i++) {
    add += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) {
    rev = 0;
  }
  if (rev !== parseInt(cpf.charAt(9))) {
    return false;
  }
  // Valida 2o digito
  add = 0;
  for (let i = 0; i < 10; i++) {
    add += parseInt(cpf.charAt(i)) * (11 - i);
  }
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) {
    rev = 0;
  }
  if (rev !== parseInt(cpf.charAt(10))) {
    return false;
  }
  return true;
};

export const somenteNumeros = valor => {
  if (!valor) {
    return valor;
  }

  return String(valor).replace(/[^\d]+/g, '');
};

export const normalizarString = valor => {
  if (!valor) {
    return valor;
  }
  return valor.toUpperCase().trim();
};

export const removerCaracteresEspeciais = valor => {
  if (!valor) {
    return valor;
  }
  return valor.replace(/[^\w\s]/gi, '');
};

export const removerLetras = valor => {
  if (!valor) {
    return valor;
  }
  return valor.replace(/[a-zA-Z]/gi, '');
};

export const formatarTelefone = valor => {
  if (!valor) return;
  let novoValor = valor.slice(0, 10);
  novoValor = novoValor.replace(/\D/g, '');
  novoValor = novoValor.replace(/(\d)(\d{4})$/, '$1-$2');

  return novoValor;
};

export const formatarCelular = valor => {
  if (!valor) return;
  const valorFormatado = valor.replaceAll(
    // eslint-disable-next-line no-useless-escape
    /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
    ''
  );
  return valorFormatado.replaceAll(' ', '');
};

export const mascaraCelular = (ddd, numero) => {
  if (!ddd) return;
  if (!numero) return;

  let numeroFormatado = '';

  const novoDDD = ddd.replace(/([^\d])+/gim, '');
  let novoNumero = numero.replace(/([^\d])+/gim, '');

  if (novoDDD.length === 3) {
    numeroFormatado += `(0${novoDDD.substr(1)}) `;
  } else if (novoDDD.length !== 2) {
    return null;
  } else {
    numeroFormatado += `(0${novoDDD}) `;
  }

  if (novoNumero.length === 9) {
    novoNumero = `${novoNumero.substr(0, 5)}-${novoNumero.substr(-4)}`;
  } else {
    novoNumero = `${novoNumero.substr(0, 4)}-${novoNumero.substr(-4)}`;
  }

  numeroFormatado += novoNumero;

  return numeroFormatado;
};

export const formatarCpf = valor => {
  if (!valor) return;

  const novoValor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

  return novoValor;
};

export const formatarCnpj = valor => {
  if (!valor) return;

  const novoValor = valor.replace(/\D/g, '');

  if (novoValor.length === 11) {
    return novoValor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
  }

  return novoValor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5');
};

export const formatarDinheiro = valor => {
  if (valor || valor === 0) {
    const novoValor = Number(valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return novoValor;
  }
};

export const converterMoedaEmNumero = valor => {
  if (typeof valor === 'number') return valor;
  return valor
    .replace(/[^\d,]+/g, '') // Remove caracteres desnecessários.
    .replace(',', '.'); // Tro
};

export const formatarDataEmTexto = valor => {
  if (!valor) return;

  moment.updateLocale('pt-br', localization);

  const novoValor = moment(valor).format('DD/MM/yyyy');

  return novoValor;
};

export const formatarData = (valor, format = 'DD/MM/YYYY HH:mm') => {
  if (!valor) return;

  const novoValor = moment(valor).format(format);

  return novoValor;
};

export const converterDateString = (data) => {
  if (!data) return;

  try {
    const [date] = data.split(' ')
    const [d, m, y] = date.split('/')
    return new Date(`${y}-${m}-${d}`);
  } catch (e) {
    return null
  }
}

export const formatarCpfCnpj = valor => {
  if (!valor) return;

  const novoValor = valor.replace(/[^\w\s]/gi, '').slice(0, 14);

  if (novoValor.length === 11) {
    return novoValor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
  }
  if (novoValor.length === 14) {
    return formatarCnpj(novoValor).replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
      '$1.$2.$3/$4-$5'
    );
  }

  return novoValor;
};

export const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    notification.error({
      message: 'Algo deu errado',
      description: 'Por favor insira um arquivo válido em formato de imagem',
    });
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    notification.error({
      message: 'Algo deu errado',
      description: 'Arquivo maior que 2MB',
    });
  }
  return isJpgOrPng && isLt2M;
};

export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export const capitalize = s => {
  if (!s) return;
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const formatarCEP = cep => {
  if (!cep || typeof cep !== 'string') return;
  return cep.replace(/\D/g, '');
};

export const mascaraCEP = cep => {
  const newCep = formatarCEP(cep);
  return newCep && `${newCep.substr(0, 5)}-${newCep.substr(5, newCep.length - 5)}`;
};

export const diferencaEmHoras = (data1, data2) => {
  const duration = moment.duration(moment(data1).diff(data2));
  const hours = Math.trunc(duration.asHours());

  const minutes = Math.round(duration.asMinutes());
  const seconds = moment.unix(duration.asSeconds()).format('ss');

  return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds}`;
};

export const round = (number, precision) => {
  const factor = 10 ** precision;
  const tempNumber = number * factor;
  const roundedTempNumber = Math.round(tempNumber);
  return roundedTempNumber / factor;
};

export const normalizeParams = params =>
  JSON.parse(
    JSON.stringify(params, (_, value) => {
      let val = value === null ? undefined : value;
      if (Array.isArray(val) && value.length === 0) {
        val = undefined;
      }
      return typeof val === 'string' ? (val === '' ? undefined : val.trim()) : val;
    })
  );

export const validatorCpfCnpj = (rule, value) => {
  if (value.replace(/[^\d]+/g, '').length <= 11) {
    if (validarCpf(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('CPF inválido'));
  }
  if (value.replace(/[^\d]+/g, '').length === 14) {
    return validarCnpj(value) ? Promise.resolve() : Promise.reject(new Error('CNPJ inválido'));
  }
};

/**
 * Generatea CSV String
 * @param headerArr cabecalho ex: ['token', 'date', 'loren', 'foo']
 * @param dataArr array de objetos contendo as chaves de headerArr
 * @param fieldsMap array mapeado ex: ['TP2312', '12/04/2022', 'ipsun', 'bar']
 */
export const generateCsvString = (headerArr, dataArr, fieldsMap) => {
  const rawString = [headerArr, ...dataArr.map(fieldsMap)]
  const csvResult = rawString.map(e => e.join(",")).join("\n");
  return csvResult
}

export const saveFileExcel = async (file, filename) => {
  const fileBinary = Buffer.from(file, 'binary');
  const blob = new Blob([fileBinary], { type: 'application/vnd.ms-excel' });
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, filename);
  } else {
    const href = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = href;
    a.download = `${filename}.xlsx`;
    a.click();
    URL.revokeObjectURL(a.href);
  }
};

export const saveFileCsv = async (file, filename) => {
  const fileBinary = Buffer.from(file, 'binary');
  const blob = new Blob([fileBinary], { type: 'text/csv;charset=utf-8;' });
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, filename);
  } else {
    const href = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = href;
    a.download = `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }
};

export const toTitleCase = str =>
  str
    ? str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
    : '';

export const tokenTmovpay = str => {
  if (!str) {
    return false;
  }

  return str.substr(0, 2) === 'TP';
};
