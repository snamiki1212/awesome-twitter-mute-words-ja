const DELAY_MS = 500;

const KEYWORDS = `テスト1
テスト2`.split(/\r\n|\n/);

const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  "value"
).set;

/**
 * Selectors
 */
const selectKeywordInput = () => document.querySelector("[name='keyword']");

const selectSaveButton = () =>
  document.querySelector("[data-testid='settingsDetailSave']");

const selectAddMuteWordButton = () =>
  document.querySelector("a[href='/settings/add_muted_keyword']");

/**
 * Helper
 */
const setAndSaveKeyword = (keyword) => {
  {
    // set keyword
    const input = selectKeywordInput();
    nativeInputValueSetter.call(input, keyword);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  }

  {
    // Save
    selectSaveButton().click();
  }
};

const delay = () => {
  return new Promise((res) => setTimeout(res, DELAY_MS));
};

/**
 * Main
 */
KEYWORDS.reduce(async (prev, keyword) => {
  await prev;
  selectAddMuteWordButton().click();
  await delay();
  setAndSaveKeyword(keyword);
  return delay();
}, Promise.resolve());
