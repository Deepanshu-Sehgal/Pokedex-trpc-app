
'use client';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Stack, Divider } from '@mui/material';
import { useEffect } from 'react';

export default function Home() {
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {}, []);

  const features = [
    {
      title: '🔍 Search by Name',
      desc: 'Look up a single Pokémon by its exact name.',
      href: '/search-by-name',
    },
    {
      title: '📋 Search by Multiple Names',
      desc: 'Provide a comma-separated list of Pokémon names.',
      href: '/by-array',
    },
    {
      title: '🎯 Filter by Type',
      desc: 'Filter and browse Pokémon based on their type.',
      href: '/by-type',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 8,
        background: `url('/pokeball-bg.png') center/cover no-repeat fixed`,
        backgroundColor: '#fafafa',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant={isMobile ? 'h4' : 'h3'}
          align="center"
          gutterBottom
          fontWeight={700}
          color="primary"
        >
          Welcome to the Pokédex App
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          gutterBottom
          color="text.secondary"
        >
          Explore Pokémon using various filters and search options.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 4,
            mt: 6,
          }}
        >
          {features.map((item, index) => (
            <Card
              key={index}
              sx={{
                width: isMobile ? '100%' : 'calc(50% - 16px)',
                minWidth: 280,
                maxWidth: 400,
                background: 'linear-gradient(135deg, #e0f7fa, #f1f8e9)',
                border: '1px solid #ccc',
                boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-6px) scale(1.02)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  gutterBottom
                  color="primary.dark"
                >
                  {item.title}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1" color="text.secondary">
                  {item.desc}
                </Typography>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2 }}>
                <Link href={item.href} passHref legacyBehavior>
                  <Button
                    variant="contained"
                    fullWidth
                    component="a"
                    sx={{ borderRadius: 2 }}
                  >
                    Go
                  </Button>
                </Link>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}