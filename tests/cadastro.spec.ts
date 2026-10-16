import { expect, test } from '@playwright/test'

test('exibe o formulário de cadastro', async ({ page }) => {
  await page.goto('/cadastro')

  await expect(page.getByRole('heading', { name: 'Criar conta' })).toBeVisible()
})
