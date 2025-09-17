import { memo } from 'react'
import { Button, Box, Typography } from '@mui/material'
import type { Task } from '@/shared/constants/kanban'
import { useStableCallback } from '@/shared/hooks'
import { BUTTON_LABELS, PAGE_TITLES, TOOLTIPS } from '@/shared/constants'

interface BoardHeaderProps {
  totalTasks: number
  showFilter: boolean
  onToggleFilter: () => void
  onAddTask: (task: Task) => void
}

/**
 * Заголовок канбан доски
 */
export const BoardHeader = memo<BoardHeaderProps>(
  ({ totalTasks, showFilter, onToggleFilter, onAddTask }) => {
    const handleToggleFilter = useStableCallback(() => {
      onToggleFilter()
    }, [onToggleFilter])

    const handleAddTask = useStableCallback(() => {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: 'Новая задача',
        description: '',
        status: 'toDo' as const,
        user: null,
        date: new Date(),
        chip: {
          label: 'To Do',
          status: 'system' as const,
        },
      }
      onAddTask(newTask)
    }, [onAddTask])

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            {PAGE_TITLES.BOARD}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Всего задач: {totalTasks}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            size="small"
            variant={showFilter ? 'contained' : 'outlined'}
            onClick={handleToggleFilter}
          >
            {showFilter
              ? BUTTON_LABELS.HIDE_FILTERS
              : BUTTON_LABELS.SHOW_FILTERS}
          </Button>

          <Button
            size="small"
            variant="contained"
            onClick={handleAddTask}
            aria-label={TOOLTIPS.ADD_TASK}
          >
            {BUTTON_LABELS.ADD_TASK}
          </Button>
        </Box>
      </Box>
    )
  },
)

BoardHeader.displayName = 'BoardHeader'
