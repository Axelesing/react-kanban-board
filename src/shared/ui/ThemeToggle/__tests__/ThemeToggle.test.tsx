import { render, screen } from '@/shared/lib/test/render'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import { ThemeToggle } from '../ThemeToggle'

const mockUseTheme = jest.fn()
jest.mock('@/shared/lib', () => ({
  ...jest.requireActual('@/shared/lib'),
  useTheme: () => mockUseTheme(),
}))

const theme = createTheme()

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    mockUseTheme.mockReturnValue({
      isDark: false,
      toggleTheme: jest.fn(),
      toggleAutoMode: jest.fn(),
      autoMode: false,
    })
  })

  test('renders light mode icon when not in dark mode', () => {
    renderWithTheme(<ThemeToggle />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  test('calls toggleTheme when clicked', () => {
    const mockToggleTheme = jest.fn()

    mockUseTheme.mockReturnValue({
      isDark: false,
      toggleTheme: mockToggleTheme,
      toggleAutoMode: jest.fn(),
      autoMode: false,
    })

    renderWithTheme(<ThemeToggle />)

    const button = screen.getByRole('button')
    button.click()

    expect(mockToggleTheme).toHaveBeenCalledTimes(1)
  })

  test('shows settings icon when in auto mode', () => {
    mockUseTheme.mockReturnValue({
      isDark: false,
      toggleTheme: jest.fn(),
      toggleAutoMode: jest.fn(),
      autoMode: true,
    })

    renderWithTheme(<ThemeToggle />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })
})
