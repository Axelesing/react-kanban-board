import { memo } from 'react'
import { Card, CardContent, Typography, Chip, Avatar, Box } from '@mui/material'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import type { Task } from '@/shared/constants/kanban'
import { pxToRem, BORDERS } from '@/shared/lib/converters'
import { cn } from '@/shared/lib'

interface TaskCardProps {
  'task': Task
  'className'?: string
  'aria-label'?: string
  'onClick'?: React.MouseEventHandler<HTMLDivElement>
  'onDoubleClick'?: React.MouseEventHandler<HTMLDivElement>
  'style'?: React.CSSProperties
}

/**
 * Общий компонент карточки задачи
 */
export const TaskCard = memo<TaskCardProps>(
  ({
    task,
    className,
    'aria-label': ariaLabel,
    onClick,
    onDoubleClick,
    style,
  }) => {
    return (
      <Card
        className={cn(
          'task-card',
          onClick && 'task-card--clickable',
          className,
        )}
        style={style}
        sx={{
          'cursor': onClick ? 'pointer' : 'default',
          'transition': 'all 0.2s ease-in-out',
          'height': 120,
          'minWidth': 310,
          'display': 'flex',
          'flexDirection': 'column',
          '&:hover': onClick
            ? {
                transform: `translateY(-${pxToRem(2)})`,
                boxShadow: 2,
              }
            : {},
          'backgroundColor': 'var(--color-bg-secondary)',
          'border': `${BORDERS.thin} solid var(--color-border-primary)`,
        }}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        aria-label={ariaLabel}
        role="listitem"
      >
        <CardContent
          sx={{
            p: 2,
            pr: 4,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 1,
            }}
          >
            <Typography
              variant="h6"
              component="h3"
              sx={{
                color: 'var(--color-text-primary)',
                fontWeight: 600,
                fontSize: '1rem',
                lineHeight: 1.3,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                flex: 1,
              }}
            >
              {task.title}
            </Typography>

            {task.chip && (
              <Chip
                label={task.chip.label}
                size="small"
                color={task.chip.status === 'system' ? 'default' : 'primary'}
                sx={{
                  ml: 1,
                  fontSize: '0.75rem',
                  height: 20,
                }}
              />
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 'auto',
            }}
          >
            {task.user && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar
                  src={task.user.avatarUrl}
                  sx={{ width: 24, height: 24 }}
                >
                  {task.user.label?.charAt(0)}
                </Avatar>
                <Typography
                  variant="caption"
                  sx={{ color: 'var(--color-text-secondary)' }}
                >
                  {task.user.label}
                </Typography>
              </Box>
            )}

            <Typography
              variant="caption"
              sx={{ color: 'var(--color-text-secondary)' }}
            >
              {format(task.date, 'dd.MM.yyyy', { locale: ru })}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    )
  },
)

TaskCard.displayName = 'TaskCard'
