import { test, expect, mock, advanceClock, DEMO_ORDER_ID } from '../fixtures'

const startBreak = '.order_break-btn'
const endBreak = '.order_take-order-btn'
const confirm = '.breaks-confirm_actions button'

test.beforeEach(async () => {
  await mock.reset()
})

test('несколько перерывов подряд попадают в итоговую сводку', async ({ nannyPage: page }) => {
  await page.goto(`/driver-order/${DEMO_ORDER_ID}`)

  await page.locator(startBreak).click()
  await page.locator(confirm).first().click()
  await expect(page.locator('.breaks_state-label')).toHaveText('Перерыв')

  await advanceClock(page, 5 * 60)
  await page.locator(endBreak).first().click()
  await page.locator(confirm).first().click()

  await expect(page.locator('.breaks_state-label')).toHaveText('Работа')
  await expect(page.locator('.breaks_item')).toHaveCount(1)

  await page.locator(startBreak).click()
  await page.locator(confirm).first().click()
  await expect(page.locator('.breaks_state-label')).toHaveText('Перерыв')

  await advanceClock(page, 10 * 60)
  await page.locator(endBreak).first().click()
  await page.locator(confirm).first().click()

  await expect(page.locator('.breaks_state-label')).toHaveText('Работа')
  await expect(page.locator('.breaks_list-header span').last()).toHaveText('2')
  await expect(page.locator('.breaks_item')).toHaveCount(2)
  await expect(page.locator('.breaks_totals dd').nth(2)).not.toHaveText('0 сек')
})
