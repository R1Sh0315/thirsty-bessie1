import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CodeIcon from '@mui/icons-material/Code';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SourceIcon from '@mui/icons-material/Source';
import AppsIcon from '@mui/icons-material/Apps';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import TerminalIcon from '@mui/icons-material/Terminal';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: (val: boolean) => void;
}

const navItems = [
  { id: 'about', label: 'About', icon: <PersonOutlineIcon /> },
  { id: 'skills', label: 'Skills', icon: <CodeIcon /> },
  { id: 'experience', label: 'Experience', icon: <WorkOutlineIcon /> },
  { id: 'contributions', label: 'Open Source', icon: <SourceIcon /> },
  { id: 'projects', label: 'Projects', icon: <AppsIcon /> },
  { id: 'certifications', label: 'Certifications', icon: <WorkspacePremiumIcon /> },
];

const Navbar: React.FC<NavbarProps> = ({ isDark, onToggleTheme }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 20,
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleScrollTo = (id: string) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={trigger ? 4 : 0}
        sx={{
          backgroundColor: trigger
            ? isDark
              ? 'rgba(11, 17, 32, 0.85)'
              : 'rgba(255, 255, 255, 0.85)'
            : 'transparent',
          backdropFilter: trigger ? 'blur(12px)' : 'none',
          borderBottom: trigger
            ? isDark
              ? '1px solid rgba(255, 255, 255, 0.08)'
              : '1px solid rgba(0, 0, 0, 0.06)'
            : 'none',
          transition: 'all 0.3s ease-in-out',
          color: isDark ? '#f1f5f9' : '#0f172a',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 70 }}>
            {/* Logo / Brand */}
            <Box
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: 36,
                  height: 36,
                  boxShadow: '0 4px 14px 0 rgba(56, 189, 248, 0.39)',
                }}
              >
                <TerminalIcon sx={{ fontSize: 20, color: '#fff' }} />
              </Avatar>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1.1rem', sm: '1.25rem' },
                  letterSpacing: '-0.5px',
                  background: isDark
                    ? 'linear-gradient(90deg, #38bdf8 0%, #818cf8 100%)'
                    : 'linear-gradient(90deg, #0284c7 0%, #4f46e5 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Rishikesh.dev
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => handleScrollTo(item.id)}
                  sx={{
                    color: isDark ? '#cbd5e1' : '#475569',
                    fontSize: '0.92rem',
                    fontWeight: 500,
                    px: 1.6,
                    py: 0.8,
                    borderRadius: '8px',
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: isDark
                        ? 'rgba(56, 189, 248, 0.08)'
                        : 'rgba(2, 132, 199, 0.08)',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}

              {/* Theme Toggle Button */}
              <Tooltip title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
                <IconButton
                  onClick={() => onToggleTheme(!isDark)}
                  sx={{
                    ml: 1,
                    p: 1.1,
                    color: isDark ? '#fbbf24' : '#64748b',
                    bgcolor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                    border: isDark
                      ? '1px solid rgba(255, 255, 255, 0.1)'
                      : '1px solid rgba(0, 0, 0, 0.08)',
                    '&:hover': {
                      bgcolor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                      transform: 'rotate(15deg)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {isDark ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
              </Tooltip>
            </Box>

            {/* Mobile Actions */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
              <Tooltip title={isDark ? 'Light Mode' : 'Dark Mode'}>
                <IconButton
                  onClick={() => onToggleTheme(!isDark)}
                  size="small"
                  sx={{
                    color: isDark ? '#fbbf24' : '#64748b',
                    bgcolor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                    border: isDark
                      ? '1px solid rgba(255, 255, 255, 0.1)'
                      : '1px solid rgba(0, 0, 0, 0.08)',
                  }}
                >
                  {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
                </IconButton>
              </Tooltip>

              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  color: isDark ? '#f1f5f9' : '#0f172a',
                  bgcolor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: isDark ? '#0f172a' : '#ffffff',
            backgroundImage: 'none',
            color: isDark ? '#f1f5f9' : '#0f172a',
            p: 2,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={700} color="primary.main">
            Navigation
          </Typography>
          <IconButton onClick={handleDrawerToggle} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          {navItems.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => handleScrollTo(item.id)}
                sx={{
                  borderRadius: 2,
                  py: 1.2,
                  '&:hover': {
                    bgcolor: isDark ? 'rgba(56, 189, 248, 0.12)' : 'rgba(2, 132, 199, 0.08)',
                    color: 'primary.main',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontWeight: 600, fontSize: '0.95rem' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
