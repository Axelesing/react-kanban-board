import { render, screen } from '@/shared/lib/test/render'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import { ThemeSelector } from '../ThemeSelector'

const mockUseTheme = jest.fn()
jest.mock('@/shared/lib', () => ({
  ...jest.requireActual('@/shared/lib'),
  useTheme: () => mockUseTheme(),
}))

const theme = createTheme()

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('ThemeSelector', () => {
  beforeEach(() => {
    mockUseTheme.mockReturnValue({
      currentTheme: { name: 'light', meta: { description: 'Светлая тема' } },
      themeMode: 'light',
      autoMode: false,
      availableThemes: [
        { name: 'light', meta: { description: 'Светлая тема' } },
        { name: 'dark', meta: { description: 'Темная тема' } },
      ],
      setTheme: jest.fn(),
      setMode: jest.fn(),
      setAutoMode: jest.fn(),
    })
  })

  test('renders theme selector with title', () => {
    renderWithTheme(<ThemeSelector showTitle={true} />)

    expect(screen.getByText('Настройки темы')).toBeInTheDocument()
    expect(screen.getAllByText('Тема')).toHaveLength(2)
    expect(screen.getAllByText('Режим')).toHaveLength(2)
  })

  test('renders without title when showTitle is false', () => {
    renderWithTheme(<ThemeSelector showTitle={false} />)

    expect(screen.queryByText('Настройки темы')).not.toBeInTheDocument()
    expect(screen.getAllByText('Тема')).toHaveLength(2)
    expect(screen.getAllByText('Режим')).toHaveLength(2)
  })

  test('shows auto mode switch when showAutoMode is true', () => {
    renderWithTheme(<ThemeSelector showAutoMode={true} />)

    expect(screen.getByText('Автоматическое переключение')).toBeInTheDocument()
  })

  test('does not show auto mode switch when showAutoMode is false', () => {
    renderWithTheme(<ThemeSelector showAutoMode={false} />)

    expect(
      screen.queryByText('Автоматическое переключение'),
    ).not.toBeInTheDocument()
  })
})
