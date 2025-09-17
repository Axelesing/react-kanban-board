/* eslint-disable import-x/no-extraneous-dependencies */
import React, { PropsWithChildren } from 'react'

import {
  render as rawRender,
  RenderOptions as RawRenderParams,
  RenderResult as RawRenderResult,
} from '@testing-library/react'
import type { Scope as EffectorScope } from 'effector'
import { Provider as EffectorScopeProvider } from 'effector-react'

function render(
  ui: React.ReactElement,
  environmentParams: RenderParams = {},
  renderParams: Omit<RawRenderParams, 'wrapper'> = {},
): RawRenderResult {
  const { withEnvironment } = composeEnvironment(environmentParams)

  const Wrapper: React.FC<PropsWithChildren> = ({ children }) =>
    withEnvironment(children)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return rawRender(ui, { wrapper: Wrapper, ...renderParams })
}

function composeEnvironment({ effectorScope }: RenderParams): {
  withEnvironment: WithProvider
} {
  const identityProvider: WithProvider = (children) => children

  const withEffector: WithProvider = effectorScope
    ? (children) => (
        <EffectorScopeProvider value={effectorScope}>
          {children}
        </EffectorScopeProvider>
      )
    : identityProvider

  const providers = [withEffector]

  return {
    withEnvironment: (node) =>
      providers.reduce((current, fn) => fn(current), node),
  }
}

interface RenderParams {
  effectorScope?: EffectorScope
}

type WithProvider = (children: React.ReactNode) => React.ReactNode

export { render }
export * from '@testing-library/react'
