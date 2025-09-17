import { memo } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { LightMode, DarkMode, Settings } from '@mui/icons-material'

import { useTheme, cn } from '@/shared/lib'

interface ThemeToggleProps {
  size?: 's' | 'm' | 'l'
  iconOnly?: boolean
  className?: string
}

/**
 * Компонент переключателя темы
 */
export const ThemeToggle = memo<ThemeToggleProps>(
  ({ size = 'm', className }) => {
    const { isDark, toggleTheme, toggleAutoMode, autoMode } = useTheme()

    const getIcon = () => {
      if (autoMode) {
        return Settings
      }
      return isDark ? LightMode : DarkMode
    }

    const getTitle = () => {
      if (autoMode) {
        return 'Автоматическое переключение темы'
      }

      return isDark
        ? 'Переключить на светлую тему'
        : 'Переключить на темную тему'
    }

    const handleClick = () => {
      if (autoMode) {
        toggleAutoMode()
      } else {
        toggleTheme()
      }
    }

    const IconComponent = getIcon()

    return (
      <Tooltip
        title={getTitle()}
        placement="bottom"
        arrow
        PopperProps={{
          sx: {
            'zIndex': 9999,
            '& .MuiTooltip-tooltip': {
              fontSize: '0.875rem',
              maxWidth: 200,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              borderRadius: '6px',
              padding: '8px 12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            },
            '& .MuiTooltip-arrow': {
              color: 'rgba(0, 0, 0, 0.8)',
            },
          },
          modifiers: [
            {
              name: 'preventOverflow',
              enabled: true,
              options: {
                boundary: 'viewport',
              },
            },
            {
              name: 'flip',
              enabled: true,
            },
            {
              name: 'offset',
              enabled: true,
              options: {
                offset: [0, 8],
              },
            },
          ],
        }}
      >
        <IconButton
          onClick={handleClick}
          size={size === 's' ? 'small' : size === 'l' ? 'large' : 'medium'}
          aria-label={getTitle()}
          className={cn(
            'theme-toggle',
            `theme-toggle--${size}`,
            autoMode && 'theme-toggle--auto',
            className,
          )}
        >
          <IconComponent />
        </IconButton>
      </Tooltip>
    )
  },
)

ThemeToggle.displayName = 'ThemeToggle'
