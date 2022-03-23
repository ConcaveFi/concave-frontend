import { render, RenderOptions } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AppProviders } from 'contexts'

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AppProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
