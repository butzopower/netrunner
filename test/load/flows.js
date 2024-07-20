module.exports = {signupFlow};

const corpStarterURL = 'https://netrunnerdb.com/en/decklist/0665c5c7-f7f1-4674-86b5-ca4e371888f2/system-gateway-starter-corp-34-cards-';

async function signupFlow(page) {
    const id = String(new Date().getTime());
    await page.goto('http://localhost:1042');

    await page.click('text=Sign up');
    await page.locator('#register-form').getByPlaceholder('Email').fill(`${id}@example.com`);
    await page.locator('#register-form').getByPlaceholder('Username').fill(id);
    await page.locator('#register-form').getByRole('textbox', {name: 'Password', exact: true}).fill('password');
    await page.locator('#register-form').getByRole('textbox', {name: 'Confirm password', exact: true}).fill('password');
    await page.locator('#register-form').getByRole('button', {name: 'Sign up'}).click();

    await page.click('text=Login');
    await page.locator('#login-form').getByPlaceholder('Username').fill(id);
    await page.locator('#login-form').getByRole('textbox', {name: 'Password', exact: true}).fill('password');
    await page.locator('#login-form').getByRole('button', {name: 'Log in'}).click();

    await page.click('text=Deck Builder');
    await page.click('text=Import deck');
    await page.getByPlaceholder('NRDB ID').fill(corpStarterURL);
    await page.getByRole('button', {name: 'Import', exact: true}).click();

    await page.click('text=Play');
    await page.click('text=New game');
    await page.getByLabel('Corp').click();
    await page.locator('.format').selectOption('Casual');
    await page.getByRole('button', {name: 'Create', exact: true}).click();

    await page.click('text=Select deck');
    await page.locator('.deckline').first().click();
    await page.getByRole('button', {name: 'Start', exact: true}).click();

    await new Promise(r => setTimeout(r, 2000));
}
