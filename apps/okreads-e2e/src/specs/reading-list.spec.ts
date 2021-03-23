import { $, $$, browser, ExpectedConditions } from 'protractor';

describe('When: Reading list feature', () => {

  const listData = async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();
    const readingListItems = await $$('.reading-list-item');
    readingListItems.length > 0 ? readingListItems.forEach(item => item.$$('.remove').click()) : null;
  }

  beforeAll(async () => {
    listData();
  })

  beforeEach(async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
  })

  afterAll(async () => {
    listData();
  })

  it('Then: See my reading list', async () => {
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();
  });

  it('Then: Should be able to add books to the reading list and mark as finished reading when done', async () => {
    const submitbutton = await $('mat-icon');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await submitbutton.click();
    let items = await $$('[data-testing="book-item"]');
    items[0].$('button').click();
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();
    const readingListItems = await $$('.reading-list-item');

    // Recent book added to the list
    expect(readingListItems.length).toBe(1);
    await readingListItems[0].$('.finished').click();

    // Marked as finished when reading is completed
    expect(readingListItems[0].$('.finished-date')).toBeDefined();

    items = await $$('[data-testing="book-item"]');
    const button = await items[0].$('button')

    // Marked a finished in the list, update the button as Finished in search list.
    expect(button.getText()).toBe('Finished');
  });

});
