import { render, screen, fireEvent, waitFor } from '@/shared/lib/test/render'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import { SearchInput } from '../SearchInput'

const theme = createTheme()

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('SearchInput', () => {
  const mockOnSearchChange = jest.fn()

  beforeEach(() => {
    mockOnSearchChange.mockClear()
  })

  test('renders search input with placeholder', () => {
    renderWithTheme(
      <SearchInput
        onSearchChange={mockOnSearchChange}
        placeholder="Test placeholder"
      />,
    )

    expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument()
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  test('calls onSearchChange with debounce', async () => {
    renderWithTheme(
      <SearchInput onSearchChange={mockOnSearchChange} debounceDelay={100} />,
    )

    const input = screen.getByRole('searchbox')
    const textInput = input.querySelector('input')
    if (textInput) {
      fireEvent.change(textInput, { target: { value: 'test query' } })
    }

    await waitFor(
      () => {
        expect(mockOnSearchChange).toHaveBeenCalledWith('test query')
      },
      { timeout: 200 },
    )
  })

  test('shows clear button when there is text', () => {
    renderWithTheme(
      <SearchInput onSearchChange={mockOnSearchChange} initialValue="test" />,
    )

    expect(screen.getByLabelText('Очистить поиск')).toBeInTheDocument()
  })

  test('clears input when clear button is clicked', () => {
    renderWithTheme(
      <SearchInput onSearchChange={mockOnSearchChange} initialValue="test" />,
    )

    const clearButton = screen.getByLabelText('Очистить поиск')
    fireEvent.click(clearButton)

    expect(screen.getByDisplayValue('')).toBeInTheDocument()
    expect(mockOnSearchChange).toHaveBeenCalledWith('')
  })

  test('is disabled when disabled prop is true', () => {
    renderWithTheme(
      <SearchInput onSearchChange={mockOnSearchChange} disabled={true} />,
    )

    const searchContainer = screen.getByRole('searchbox')
    const textInput = searchContainer.querySelector('input')
    expect(textInput).toBeDisabled()
  })
})
