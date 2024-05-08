const keywordFilter = document.querySelector('.keywords-field_input') as HTMLInputElement;

export function getKeywordInputValue(): string {
  return keywordFilter.value;
}
