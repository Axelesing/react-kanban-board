import { Outlet, Link } from 'react-router-dom'
import { Box, Typography, AppBar, Toolbar, Container } from '@mui/material'

import { ThemeToggle } from '@/shared/ui/ThemeToggle'

export function AppLayout() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
            <Link
              to="/"
              style={{
                color: 'inherit',
                textDecoration: 'none',
                fontWeight: 500,
              }}
              aria-label="Перейти на главную страницу"
            >
              Board
            </Link>
            <Link
              to="/about"
              style={{
                color: 'inherit',
                textDecoration: 'none',
                fontWeight: 500,
              }}
              aria-label="Перейти на страницу о приложении"
            >
              About
            </Link>
            <Link
              to="/theme"
              style={{
                color: 'inherit',
                textDecoration: 'none',
                fontWeight: 500,
              }}
              aria-label="Перейти на страницу настроек темы"
            >
              Theme
            </Link>
          </Box>
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flex: 1, p: 1 }}>
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>

      <Box
        component="footer"
        sx={{
          py: 1,
          px: 2,
          borderTop: 1,
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2024 Kanban App. Все права защищены.
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}
