import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronRightIcon,
  StarIcon,
} from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Progress,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { WIDTH_2XL } from '../components/Layout';
import { useEIP1193Provider } from '../context/EIP1193ProviderContextProvider';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const ASSETS = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 67420.5,
    change24h: 2.34,
    holdings: 0.5,
    value: 33710.25,
    color: '#F7931A',
    allocation: 55,
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3521.8,
    change24h: -1.12,
    holdings: 4.2,
    value: 14791.56,
    color: '#627EEA',
    allocation: 24,
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    price: 178.4,
    change24h: 5.67,
    holdings: 28.0,
    value: 4995.2,
    color: '#9945FF',
    allocation: 8,
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    price: 1.0,
    change24h: 0.01,
    holdings: 5000.0,
    value: 5000.0,
    color: '#2775CA',
    allocation: 8,
  },
  {
    symbol: 'MATIC',
    name: 'Polygon',
    price: 0.89,
    change24h: -3.21,
    holdings: 1200.0,
    value: 1068.0,
    color: '#8247E5',
    allocation: 2,
  },
  {
    symbol: 'LINK',
    name: 'Chainlink',
    price: 18.42,
    change24h: 4.55,
    holdings: 85.0,
    value: 1565.7,
    color: '#2A5ADA',
    allocation: 3,
  },
];

const RECENT_TRADES = [
  { type: 'BUY', symbol: 'BTC', amount: '0.05 BTC', value: '$3,371.03', time: '2h ago', status: 'completed' },
  { type: 'SELL', symbol: 'ETH', amount: '1.0 ETH', value: '$3,521.80', time: '5h ago', status: 'completed' },
  { type: 'BUY', symbol: 'SOL', amount: '10.0 SOL', value: '$1,784.00', time: '1d ago', status: 'completed' },
  { type: 'BUY', symbol: 'LINK', amount: '25.0 LINK', value: '$460.50', time: '2d ago', status: 'completed' },
  { type: 'SELL', symbol: 'MATIC', amount: '500 MATIC', value: '$445.00', time: '3d ago', status: 'completed' },
];

const FEATURES = [
  {
    icon: '📈',
    title: 'Real-time Tracking',
    description:
      'Monitor your portfolio value with live price feeds across all major crypto assets.',
  },
  {
    icon: '⚡',
    title: 'Instant Trading',
    description:
      'Execute trades instantly with low fees across hundreds of trading pairs.',
  },
  {
    icon: '🔒',
    title: 'Non-Custodial Security',
    description:
      'Your keys, your crypto. Full control with Coinbase Wallet SDK integration.',
  },
  {
    icon: '📊',
    title: 'Advanced Analytics',
    description:
      'Deep insights into your P&L, allocation, and historical performance.',
  },
  {
    icon: '🌐',
    title: 'Multi-Chain Support',
    description:
      'Trade and track assets across Ethereum, Base, Polygon, Solana and more.',
  },
  {
    icon: '🤖',
    title: 'Smart Rebalancing',
    description:
      'Automated portfolio rebalancing to keep your target allocations on track.',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(value: number, digits = 2) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

function fmtPct(value: number) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function HeroSection({ onConnect }: { onConnect: () => void }) {
  const bg = useColorModeValue('gray.50', 'gray.900');
  const textMuted = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box
      bg={bg}
      borderBottom="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      py={{ base: 16, md: 24 }}
      position="relative"
      overflow="hidden"
    >
      {/* decorative blobs */}
      <Box
        position="absolute"
        top="-80px"
        right="-80px"
        w="400px"
        h="400px"
        borderRadius="full"
        bg="blue.500"
        opacity={0.06}
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="-60px"
        left="-60px"
        w="300px"
        h="300px"
        borderRadius="full"
        bg="purple.500"
        opacity={0.06}
        pointerEvents="none"
      />

      <Container maxW={WIDTH_2XL}>
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={12} alignItems="center">
          <GridItem>
            <Badge colorScheme="blue" mb={4} fontSize="sm" px={3} py={1} borderRadius="full">
              🚀 Powered by Coinbase Wallet SDK
            </Badge>
            <Heading
              as="h1"
              size="2xl"
              lineHeight={1.2}
              mb={6}
              bgGradient="linear(to-r, blue.500, purple.500)"
              bgClip="text"
            >
              Your Crypto Portfolio,
              <br />
              Reimagined.
            </Heading>
            <Text fontSize="xl" color={textMuted} mb={8} maxW="480px">
              Trade smarter, track everything, and grow your wealth — all in one slick, non-custodial
              platform built on Coinbase Wallet SDK.
            </Text>
            <Flex gap={4} wrap="wrap">
              <Button
                size="lg"
                colorScheme="blue"
                rightIcon={<ChevronRightIcon />}
                onClick={onConnect}
                px={8}
              >
                Connect Wallet
              </Button>
              <Button size="lg" variant="outline" colorScheme="blue">
                View Demo
              </Button>
            </Flex>
          </GridItem>

          {/* Hero stats card */}
          <GridItem>
            <Box
              bg={useColorModeValue('white', 'gray.800')}
              borderRadius="2xl"
              shadow="2xl"
              p={6}
              border="1px solid"
              borderColor={useColorModeValue('gray.100', 'gray.700')}
            >
              <Flex justify="space-between" align="center" mb={4}>
                <Text fontWeight="bold" fontSize="sm" color={textMuted} textTransform="uppercase" letterSpacing="wider">
                  Portfolio Overview
                </Text>
                <Badge colorScheme="green" variant="subtle">
                  Live
                </Badge>
              </Flex>
              <Heading size="xl" mb={1}>
                {fmt(61130.71)}
              </Heading>
              <Flex align="center" gap={2} mb={6}>
                <Icon as={ArrowUpIcon} color="green.500" boxSize={3} />
                <Text color="green.500" fontWeight="semibold">
                  +{fmt(1423.5)} (2.38%) today
                </Text>
              </Flex>
              <Divider mb={4} />
              {ASSETS.slice(0, 4).map((a) => (
                <Flex key={a.symbol} justify="space-between" align="center" mb={3}>
                  <Flex align="center" gap={3}>
                    <Box
                      w={8}
                      h={8}
                      borderRadius="full"
                      bg={a.color}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color="white"
                      fontSize="xs"
                      fontWeight="bold"
                    >
                      {a.symbol.slice(0, 1)}
                    </Box>
                    <Box>
                      <Text fontWeight="semibold" fontSize="sm">
                        {a.name}
                      </Text>
                      <Text fontSize="xs" color={textMuted}>
                        {a.holdings} {a.symbol}
                      </Text>
                    </Box>
                  </Flex>
                  <Box textAlign="right">
                    <Text fontWeight="semibold" fontSize="sm">
                      {fmt(a.value)}
                    </Text>
                    <Text
                      fontSize="xs"
                      color={a.change24h >= 0 ? 'green.500' : 'red.500'}
                      fontWeight="semibold"
                    >
                      {fmtPct(a.change24h)}
                    </Text>
                  </Box>
                </Flex>
              ))}
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}

function StatsBar() {
  const bg = useColorModeValue('blue.600', 'blue.700');
  const totalValue = ASSETS.reduce((s, a) => s + a.value, 0);
  const stats = [
    { label: 'Total Portfolio Value', value: fmt(totalValue), arrow: 'increase' as const, pct: '2.38%' },
    { label: '24h P&L', value: '+$1,423.50', arrow: 'increase' as const, pct: '+2.38%' },
    { label: 'All-time P&L', value: '+$18,740.22', arrow: 'increase' as const, pct: '+44.2%' },
    { label: 'Active Assets', value: `${ASSETS.length}`, arrow: undefined, pct: undefined },
  ];

  return (
    <Box bg={bg} py={6}>
      <Container maxW={WIDTH_2XL}>
        <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={4}>
          {stats.map((s) => (
            <Stat key={s.label} color="white" textAlign="center">
              <StatLabel fontSize="xs" opacity={0.8} textTransform="uppercase" letterSpacing="wide">
                {s.label}
              </StatLabel>
              <StatNumber fontSize={{ base: 'xl', md: '2xl' }}>{s.value}</StatNumber>
              {s.arrow && (
                <StatHelpText mb={0} color="whiteAlpha.800">
                  <StatArrow type={s.arrow} />
                  {s.pct}
                </StatHelpText>
              )}
            </Stat>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function AssetsTable() {
  const [sortField, setSortField] = useState<'value' | 'change24h' | 'price'>('value');
  const sorted = [...ASSETS].sort((a, b) => b[sortField] - a[sortField]);
  const cardBg = useColorModeValue('white', 'gray.800');
  const textMuted = useColorModeValue('gray.500', 'gray.400');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Card bg={cardBg} shadow="md" border="1px solid" borderColor={borderColor} borderRadius="2xl">
      <CardHeader pb={0}>
        <Flex justify="space-between" align="center" wrap="wrap" gap={2}>
          <Heading size="md">Your Assets</Heading>
          <Flex gap={2}>
            {(['value', 'price', 'change24h'] as const).map((f) => (
              <Button
                key={f}
                size="xs"
                variant={sortField === f ? 'solid' : 'ghost'}
                colorScheme={sortField === f ? 'blue' : 'gray'}
                onClick={() => setSortField(f)}
                textTransform="capitalize"
              >
                {f === 'change24h' ? '24h %' : f}
              </Button>
            ))}
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Box overflowX="auto">
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>Asset</Th>
                <Th isNumeric>Price</Th>
                <Th isNumeric>24h Change</Th>
                <Th isNumeric>Holdings</Th>
                <Th isNumeric>Value</Th>
                <Th isNumeric>Allocation</Th>
                <Th />
              </Tr>
            </Thead>
            <Tbody>
              {sorted.map((a) => (
                <Tr key={a.symbol} _hover={{ bg: hoverBg }} cursor="pointer">
                  <Td>
                    <Flex align="center" gap={3}>
                      <Box
                        w={9}
                        h={9}
                        borderRadius="full"
                        bg={a.color}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="white"
                        fontWeight="bold"
                        fontSize="sm"
                        flexShrink={0}
                      >
                        {a.symbol.slice(0, 1)}
                      </Box>
                      <Box>
                        <Text fontWeight="semibold" fontSize="sm">
                          {a.name}
                        </Text>
                        <Text fontSize="xs" color={textMuted}>
                          {a.symbol}
                        </Text>
                      </Box>
                    </Flex>
                  </Td>
                  <Td isNumeric fontWeight="semibold">
                    {fmt(a.price)}
                  </Td>
                  <Td isNumeric>
                    <Flex align="center" justify="flex-end" gap={1}>
                      <Icon
                        as={a.change24h >= 0 ? ArrowUpIcon : ArrowDownIcon}
                        color={a.change24h >= 0 ? 'green.500' : 'red.500'}
                        boxSize={3}
                      />
                      <Text
                        color={a.change24h >= 0 ? 'green.500' : 'red.500'}
                        fontWeight="semibold"
                        fontSize="sm"
                      >
                        {fmtPct(a.change24h)}
                      </Text>
                    </Flex>
                  </Td>
                  <Td isNumeric color={textMuted} fontSize="sm">
                    {a.holdings.toLocaleString()} {a.symbol}
                  </Td>
                  <Td isNumeric fontWeight="semibold">
                    {fmt(a.value)}
                  </Td>
                  <Td isNumeric minW="120px">
                    <Flex align="center" gap={2} justify="flex-end">
                      <Progress
                        value={a.allocation}
                        size="sm"
                        colorScheme="blue"
                        borderRadius="full"
                        w="60px"
                      />
                      <Text fontSize="xs" color={textMuted} w="30px" textAlign="right">
                        {a.allocation}%
                      </Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Button size="xs" colorScheme="blue" variant="outline">
                      Trade
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </CardBody>
    </Card>
  );
}

function AllocationCard() {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const textMuted = useColorModeValue('gray.500', 'gray.400');
  const totalValue = ASSETS.reduce((s, a) => s + a.value, 0);

  return (
    <Card bg={cardBg} shadow="md" border="1px solid" borderColor={borderColor} borderRadius="2xl" h="full">
      <CardHeader>
        <Heading size="md">Portfolio Allocation</Heading>
      </CardHeader>
      <CardBody pt={0}>
        <Flex direction="column" gap={3}>
          {ASSETS.map((a) => (
            <Box key={a.symbol}>
              <Flex justify="space-between" mb={1}>
                <Flex align="center" gap={2}>
                  <Box w={3} h={3} borderRadius="full" bg={a.color} />
                  <Text fontSize="sm" fontWeight="semibold">
                    {a.symbol}
                  </Text>
                </Flex>
                <Flex align="center" gap={3}>
                  <Text fontSize="sm" color={textMuted}>
                    {fmt(a.value)}
                  </Text>
                  <Text fontSize="sm" fontWeight="bold" w="40px" textAlign="right">
                    {((a.value / totalValue) * 100).toFixed(1)}%
                  </Text>
                </Flex>
              </Flex>
              <Progress
                value={(a.value / totalValue) * 100}
                size="sm"
                borderRadius="full"
                sx={{ '& > div': { background: a.color } }}
              />
            </Box>
          ))}
        </Flex>
      </CardBody>
    </Card>
  );
}

function RecentTradesCard() {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const textMuted = useColorModeValue('gray.500', 'gray.400');

  return (
    <Card bg={cardBg} shadow="md" border="1px solid" borderColor={borderColor} borderRadius="2xl" h="full">
      <CardHeader>
        <Heading size="md">Recent Trades</Heading>
      </CardHeader>
      <CardBody pt={0}>
        <Flex direction="column" gap={3}>
          {RECENT_TRADES.map((t, i) => (
            <Flex key={i} align="center" justify="space-between">
              <Flex align="center" gap={3}>
                <Tag
                  colorScheme={t.type === 'BUY' ? 'green' : 'red'}
                  size="sm"
                  fontWeight="bold"
                  minW="40px"
                  justifyContent="center"
                >
                  {t.type}
                </Tag>
                <Box>
                  <Text fontSize="sm" fontWeight="semibold">
                    {t.amount}
                  </Text>
                  <Text fontSize="xs" color={textMuted}>
                    {t.time}
                  </Text>
                </Box>
              </Flex>
              <Box textAlign="right">
                <Text fontSize="sm" fontWeight="semibold">
                  {t.value}
                </Text>
                <Badge colorScheme="gray" fontSize="xs" variant="subtle">
                  {t.status}
                </Badge>
              </Box>
            </Flex>
          ))}
        </Flex>
        <Divider mt={4} mb={3} />
        <Button w="full" size="sm" variant="ghost" colorScheme="blue" rightIcon={<ChevronRightIcon />}>
          View All Trades
        </Button>
      </CardBody>
    </Card>
  );
}

function FeaturesSection() {
  const bg = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const featureTextColor = useColorModeValue('gray.600', 'gray.400');
  const headingTextColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box bg={bg} py={16}>
      <Container maxW={WIDTH_2XL}>
        <Box textAlign="center" mb={12}>
          <Badge colorScheme="purple" mb={3} px={3} py={1} borderRadius="full" fontSize="sm">
            Platform Features
          </Badge>
          <Heading size="xl" mb={4}>
            Everything you need to trade & invest
          </Heading>
          <Text fontSize="lg" color={headingTextColor} maxW="560px" mx="auto">
            From real-time portfolio tracking to instant multi-chain trading — we have you covered.
          </Text>
        </Box>
        <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
          {FEATURES.map((f) => (
            <Card
              key={f.title}
              bg={cardBg}
              border="1px solid"
              borderColor={borderColor}
              borderRadius="2xl"
              shadow="sm"
              _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
              transition="all 0.2s"
            >
              <CardBody>
                <Text fontSize="3xl" mb={3}>
                  {f.icon}
                </Text>
                <Heading size="sm" mb={2}>
                  {f.title}
                </Heading>
                <Text fontSize="sm" color={featureTextColor}>
                  {f.description}
                </Text>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function CtaSection({ onConnect }: { onConnect: () => void }) {
  return (
    <Box
      bgGradient="linear(to-r, blue.600, purple.600)"
      py={16}
      textAlign="center"
      color="white"
    >
      <Container maxW="lg">
        <Icon as={StarIcon} boxSize={10} mb={4} opacity={0.9} />
        <Heading size="xl" mb={4}>
          Start Trading Today
        </Heading>
        <Text fontSize="lg" opacity={0.85} mb={8}>
          Connect your Coinbase Wallet and get instant access to your portfolio dashboard, live
          prices, and one-click trading.
        </Text>
        <Button
          size="lg"
          colorScheme="whiteAlpha"
          bg="white"
          color="blue.700"
          _hover={{ bg: 'whiteAlpha.900' }}
          rightIcon={<ChevronRightIcon />}
          onClick={onConnect}
          px={10}
        >
          Connect Wallet
        </Button>
      </Container>
    </Box>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const { provider } = useEIP1193Provider();

  const handleConnect = async () => {
    if (provider) {
      try {
        await provider.request({ method: 'eth_requestAccounts' });
      } catch (_) {
        // Ignore connection errors (e.g. user rejected)
      }
    }
  };

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const mutedText = useColorModeValue('gray.500', 'gray.400');

  return (
    <Box w="full">
      <HeroSection onConnect={handleConnect} />
      <StatsBar />

      <Container maxW={WIDTH_2XL} py={10}>
        {/* Assets Table */}
        <AssetsTable />

        {/* Allocation + Recent Trades */}
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={6} mt={6}>
          <AllocationCard />
          <RecentTradesCard />
        </Grid>

        {/* Quick Trade Card */}
        <Card
          bg={cardBg}
          shadow="md"
          border="1px solid"
          borderColor={borderColor}
          borderRadius="2xl"
          mt={6}
        >
          <CardHeader>
            <Heading size="md">Quick Trade</Heading>
          </CardHeader>
          <CardBody pt={0}>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
              {ASSETS.slice(0, 3).map((a) => (
                <Box
                  key={a.symbol}
                  p={4}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor={borderColor}
                  _hover={{ borderColor: 'blue.400', shadow: 'md' }}
                  transition="all 0.2s"
                >
                  <Flex justify="space-between" align="center" mb={3}>
                    <Flex align="center" gap={2}>
                      <Box
                        w={8}
                        h={8}
                        borderRadius="full"
                        bg={a.color}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="white"
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        {a.symbol.slice(0, 1)}
                      </Box>
                      <Text fontWeight="bold">{a.symbol}</Text>
                    </Flex>
                    <Text
                      fontSize="sm"
                      color={a.change24h >= 0 ? 'green.500' : 'red.500'}
                      fontWeight="semibold"
                    >
                      {fmtPct(a.change24h)}
                    </Text>
                  </Flex>
                  <Text fontWeight="bold" fontSize="lg" mb={1}>
                    {fmt(a.price)}
                  </Text>
                  <Text fontSize="xs" color={mutedText} mb={3}>
                    Holdings: {a.holdings} {a.symbol}
                  </Text>
                  <Flex gap={2}>
                    <Button size="xs" colorScheme="green" flex={1} onClick={handleConnect}>
                      Buy
                    </Button>
                    <Button size="xs" colorScheme="red" variant="outline" flex={1} onClick={handleConnect}>
                      Sell
                    </Button>
                  </Flex>
                </Box>
              ))}
            </Grid>
          </CardBody>
        </Card>
      </Container>

      <FeaturesSection />
      <CtaSection onConnect={handleConnect} />
    </Box>
  );
}
