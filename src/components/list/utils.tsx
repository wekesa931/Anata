/**
 * replace all mistyped line breaks \\n with correct one \n
 * replace all line breaks with markdown line breaks (\n) to (  \n)
 * @param text string
 * @returns markdown
 */
export const processMarkdown = (text: string) =>
  text.replace(/\\n/g, '\n').replace(/\n/g, '  \n')
