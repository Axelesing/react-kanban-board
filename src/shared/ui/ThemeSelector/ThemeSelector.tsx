import { memo } from 'react'
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
} from '@mui/material'

import { useTheme, cn } from '@/shared/lib'
import type { ThemeMode } from '@/shared/model'

interface ThemeSelectorProps {
  showTitle?: boolean
  showAutoMode?: boolean
  className?: string
}

/**
 * Компонент выбора темы
 */
export const ThemeSelector = memo<ThemeSelectorProps>(
  ({ showTitle = true, showAutoMode = true, className }) => {
    const {
      currentTheme,
      themeMode,
      autoMode,
      availableThemes,
      setTheme,
      setMode,
      setAutoMode,
    } = useTheme()

    const themeOptions = availableThemes.map((theme) => ({
      label: theme.meta.description,
      value: theme.name,
    }))

    const modeOptions = [
      { label: 'Светлая', value: 'light' },
      { label: 'Темная', value: 'dark' },
      { label: 'Автоматически', value: 'auto' },
    ]

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
        className={cn(
          'theme-selector',
          !showTitle && 'theme-selector--no-title',
          !showAutoMode && 'theme-selector--no-auto-mode',
          className,
        )}
      >
        {showTitle && (
          <Typography variant="h6" component="h2" fontWeight="bold">
            Настройки темы
          </Typography>
        )}

        <FormControl fullWidth>
          <InputLabel>Тема</InputLabel>
          <Select
            value={currentTheme.name}
            onChange={(event) => setTheme(event.target.value)}
            label="Тема"
          >
            {themeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Режим</InputLabel>
          <Select
            value={themeMode}
            onChange={(event) => setMode(event.target.value as ThemeMode)}
            label="Режим"
          >
            {modeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {showAutoMode && (
          <FormControlLabel
            control={
              <Switch
                checked={autoMode}
                onChange={(event) => setAutoMode(event.target.checked)}
              />
            }
            label="Автоматическое переключение"
          />
        )}
      </Box>
    )
  },
)

ThemeSelector.displayName = 'ThemeSelector'
