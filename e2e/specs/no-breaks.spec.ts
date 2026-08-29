import { test, expect, mock, DEMO_ORDER_ID } from '../fixtures'

test.beforeEach(async () => {
  await mock.reset()
})

test('заказ без перерывов не показывает состояние и список перерывов', async ({ nannyPage: page }) => {
  await page.goto(`/driver-order/${DEMO_ORDER_ID}`)

  // В исходном состоянии заказа перерыв не начат и фактических перерывов нет.
  await expect(page.locator('.breaks_state-label')).toHaveCount(0)
  await expect(page.locator('.breaks_item')).toHaveCount(0)
})
