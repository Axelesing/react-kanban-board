import { render, screen } from '@/shared/lib/test/render'
import { fork, allSettled, type Scope } from 'effector'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import { $$notifications } from '@/shared/model'
import { NotificationContainer } from '../NotificationContainer'

const theme = createTheme()

const renderWithTheme = (
  component: React.ReactElement,
  options?: { effectorScope?: Scope },
) => {
  return render(
    <ThemeProvider theme={theme}>{component}</ThemeProvider>,
    options,
  )
}

describe('NotificationContainer', () => {
  it('should render notifications', async () => {
    const scope = fork()

    await allSettled($$notifications.notificationRequested, {
      scope,
      params: {
        type: 'success',
        title: 'Success notification',
        message: 'Operation completed successfully',
      },
    })

    await allSettled($$notifications.notificationRequested, {
      scope,
      params: {
        type: 'error',
        title: 'Error notification',
        message: 'Something went wrong',
      },
    })

    renderWithTheme(<NotificationContainer />, { effectorScope: scope })

    expect(screen.getByText('Success notification')).toBeInTheDocument()
    expect(
      screen.getByText('Operation completed successfully'),
    ).toBeInTheDocument()
    expect(screen.getByText('Error notification')).toBeInTheDocument()
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('should render empty when no notifications', () => {
    const scope = fork()

    renderWithTheme(<NotificationContainer />, { effectorScope: scope })

    expect(screen.queryByText('Success notification')).not.toBeInTheDocument()
    expect(screen.queryByText('Error notification')).not.toBeInTheDocument()
  })

  it('should handle empty notifications array safely', () => {
    const scope = fork()

    expect(() =>
      renderWithTheme(<NotificationContainer />, { effectorScope: scope }),
    ).not.toThrow()
  })
})
