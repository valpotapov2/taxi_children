import { test, expect, mock, DEMO_ORDER_ID } from '../fixtures'

const startBreak = '.order_break-btn'
const confirm = '.breaks-confirm_actions button'

test.beforeEach(async () => {
  await mock.reset()
})

test('второй перерыв нельзя начать, пока первый активен', async ({ nannyPage: page }) => {
  await page.goto(`/driver-order/${DEMO_ORDER_ID}`)

  await page.locator(startBreak).click()
  await page.locator(confirm).first().click()

  await expect(page.locator('.breaks_state-label')).toHaveText('Перерыв')
  await expect(page.locator(startBreak)).toHaveCount(0)
  await expect(page.locator('.breaks_state-label')).toHaveText('Перерыв')
})
