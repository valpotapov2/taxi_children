import { test, expect, mock, advanceClock, DEMO_ORDER_ID } from '../fixtures'

/** Проверяет несколько завершённых перерывов подряд и итоговый список. */

test.beforeEach(async () => {
  await mock.reset()
})

test('два последовательных перерыва сохраняются отдельно в истории', async ({ nannyPage: page }) => {
  await page.goto(`/driver-order/${DEMO_ORDER_ID}`)

  // Первый перерыв: 2 минуты.
  await page.locator('.order_break-btn').click()
  await page.locator('.breaks-confirm_actions button').first().click()
  await expect(page.locator('.breaks_state-label')).toHaveText('Перерыв')
  await advanceClock(page, 2 * 60)
  await page.locator('.order_take-order-btn').first().click()
  await page.locator('.breaks-confirm_actions button').first().click()

  await expect(page.locator('.breaks_state-label')).toHaveText('Работа')
  await expect(page.locator('.breaks_item')).toHaveCount(1)

  // Второй перерыв: 3 минуты.
  await page.locator('.order_break-btn').click()
  await page.locator('.breaks-confirm_actions button').first().click()
  await expect(page.locator('.breaks_state-label')).toHaveText('Перерыв')
  await advanceClock(page, 3 * 60)
  await page.locator('.order_take-order-btn').first().click()
  await page.locator('.breaks-confirm_actions button').first().click()

  await expect(page.locator('.breaks_state-label')).toHaveText('Работа')
  await expect(page.locator('.breaks_list-header span').last()).toHaveText('2')
  await expect(page.locator('.breaks_item')).toHaveCount(2)
})
