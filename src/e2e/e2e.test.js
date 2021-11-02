import puppeteer from 'puppeteer';

const getDataTestId = (id) => {
	return `[data-testid="${id}"]`;
};

describe('Note App', () => {
	let browser;
	let page;

	beforeAll(async () => {
		browser = await puppeteer.launch({headless: true, defaultViewport: {width: 1024, height: 800}});
		page = await browser.newPage();
	});

	it('it can open list view', async () => {
		await page.goto('http://localhost:3000');
		await page.waitForSelector(getDataTestId('add-new-note'));
		await page.waitForSelector(getDataTestId('add-new-note'));
	});

	it('it can create and edit note', async () => {
		await page.goto('http://localhost:3000');
		await page.click(getDataTestId('add-new-note'));
		await page.waitForSelector(getDataTestId('note-modal'));

		const content = 'U6557';

		await page.waitForTimeout(1000);
		await page.click(getDataTestId('edit-button'));
		await page.waitForTimeout(1000);
		await page.waitForSelector(getDataTestId('source-textarea'));
		await page.$eval(getDataTestId('source-textarea'), (el) => (el.value = ''));
		await page.type(getDataTestId('source-textarea'), `${content}`);
		await page.click(getDataTestId('save-button'));
		await page.click(getDataTestId('back-button'));

		await page.waitForXPath(`//*[contains(text(), ${content})]`);
	});

	afterAll(() => browser.close());
});
