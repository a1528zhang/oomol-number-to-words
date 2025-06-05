import { ToWords } from 'to-words';

export default async function(params, context) {
  const toWords = new ToWords({
    localeCode: 'en-US'
  });

  const words = toWords.convert(params.input, {
    currency: false,
    ignoreDecimal: params.ignoreDecimal,
    ignoreZeroCurrency: false,
    currency: params.currency,
  })
  
  let output = params.prefix === null ? words : `${params.prefix}${words}`;
  output = params.suffix === null ? output : `${output}${params.suffix}`;
  output = output.trim();

  if (params.type === "uppercase") {
    output = output.toUpperCase();
  } else if (params.type === "lowercase") {
    output = output.toLowerCase();
  }

  context.preview({
    type: "text",
    data: output
  })
  
  return {
    output: output
  };
}