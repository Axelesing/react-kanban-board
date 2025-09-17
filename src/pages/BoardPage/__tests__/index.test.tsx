import { render as customRender, waitFor } from '@/shared/lib/test/render'

import { BoardPage } from '..'

jest.mock('@/features/kanban/ui/OptimizedBoard', () => ({
  OptimizedBoard: () => <div>OptimizedBoard</div>,
}))

jest.mock('@/widgets/Modal', () => ({
  TaskModal: () => <div>TaskModal</div>,
}))

describe('BoardPage', () => {
  test('matches snapshot', async () => {
    const { baseElement } = customRender(<BoardPage />)

    await waitFor(() => {
      expect(baseElement).toBeInTheDocument()
    })

    expect(baseElement).toMatchSnapshot()
  })
})
