import React, { useEffect, useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Platform,
  StatusBar as RNStatusBar,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  Ionicons,
  Feather,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

const TABS = [
  { key: 'home', label: 'Home', icon: 'home-outline', activeIcon: 'home' },
  { key: 'disease', label: 'Disease', icon: 'leaf-outline', activeIcon: 'leaf' },
  {
    key: 'pests',
    label: 'Pests',
    icon: 'bug-outline',
    activeIcon: 'bug',
  },
  {
    key: 'equipment',
    label: 'Equipment',
    icon: 'tractor',
    activeIcon: 'tractor',
    iconSet: 'mci',
  },
  {
    key: 'schemes',
    label: 'Schemes',
    icon: 'document-text-outline',
    activeIcon: 'document-text',
  },
  {
    key: 'assistant',
    label: 'Assistant',
    icon: 'mic-outline',
    activeIcon: 'mic',
  },
];

const chipData = ['All', 'Tractors', 'Harvesters', 'Planting', 'Irrigation'];

export default function App() {
  const [tab, setTab] = useState('home');
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 0.08, 1);
        if (next >= 1) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 220);
        }
        return next;
      });
    }, 120);
    return () => clearInterval(timer);
  }, []);

  const screen = useMemo(() => {
    if (tab === 'home') return <HomeScreen />;
    if (tab === 'disease') return <DiseaseScreen />;
    if (tab === 'pests') return <PestsScreen />;
    if (tab === 'equipment') return <EquipmentScreen />;
    if (tab === 'schemes') return <SchemesScreen />;
    return <AssistantScreen />;
  }, [tab]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderRoot}>
        <StatusBar style="light" backgroundColor="#2f6b3f" />
        <View style={styles.loaderLogo}>
          <Image source={require('./assets/TerraBuddy_LOGO.jpeg')} style={styles.loaderLogoImage} resizeMode="cover" />
        </View>
        <Text style={styles.loaderTitle}>TerraBuddy</Text>
        <Text style={styles.loaderSub}>Where Intelligence meets the Earth</Text>
        <View style={styles.loaderTrack}>
          <View style={[styles.loaderFill, { width: `${Math.round(progress * 100)}%` }]} />
        </View>
        <View style={styles.rowCenter}>
          <Ionicons name="leaf-outline" size={14} color="#2f6b3f" />
          <Text style={styles.loaderPct}>{Math.round(progress * 100)}%</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="dark" />
      <View style={styles.body}>{screen}</View>
      <View style={styles.tabBar}>
        {TABS.map((item) => {
          const isActive = tab === item.key;
          const iconName = isActive ? item.activeIcon : item.icon;
          const color = isActive ? '#15b84a' : '#7d8590';
          return (
            <Pressable key={item.key} style={styles.tabItem} onPress={() => setTab(item.key)}>
              {item.iconSet === 'mci' ? (
                <MaterialCommunityIcons name={iconName} size={21} color={color} />
              ) : (
                <Ionicons name={iconName} size={20} color={color} />
              )}
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{item.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

function Page({ children, backgroundColor = '#f7f8fa' }) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor }} contentContainerStyle={styles.pageContent}>
      {children}
    </ScrollView>
  );
}

function TopHeader({ title, subtitle, right }) {
  return (
    <View style={styles.topRow}>
      <View style={styles.rowCenter}>
        <Ionicons name="arrow-back" size={22} color="#131a22" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.screenTitle}>{title}</Text>
          <Text style={styles.screenSubtitle}>{subtitle}</Text>
        </View>
      </View>
      {right || <View style={{ width: 24 }} />}
    </View>
  );
}

function HomeScreen() {
  return (
    <Page backgroundColor="#edf7ef">
      <View style={styles.homeHero}>
        <View style={styles.rowBetween}>
          <View>
            <View style={styles.homeLogo}>
              <Image source={require('./assets/TerraBuddy_LOGO.jpeg')} style={styles.homeLogoImage} resizeMode="cover" />
            </View>
            <Text style={styles.heroBrand}>TerraBuddy</Text>
            <Text style={styles.heroSub}>Where Intelligence meets the Earth</Text>
          </View>
          <View style={styles.heroIconCircle}>
            <Ionicons name="leaf" size={22} color="#d7f6e1" />
          </View>
        </View>
        <View style={styles.weatherCard}>
          <View>
            <Text style={styles.weatherTiny}>Today's Weather</Text>
            <Text style={styles.weatherTemp}>28{"\u00B0"}C</Text>
            <Text style={styles.weatherTiny}>Partly Cloudy</Text>
          </View>
          <Ionicons name="sunny-outline" size={34} color="#ffe45f" />
        </View>
        <View style={styles.weatherStats}>
          <InfoMetric icon="water-outline" label="Humidity" value="65%" />
          <InfoMetric icon="wind" label="Wind" value="12 km/h" />
          <InfoMetric icon="rainy-outline" label="Rain" value="30%" />
        </View>
      </View>

      <View style={styles.warningBanner}>
        <Ionicons name="warning-outline" size={18} color="#df6f1a" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.warnTitle}>Pest Alert in Your Area</Text>
          <Text style={styles.warnSub}>Brown plant hoppers detected 2 km away. Check pest alerts.</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Quick Access</Text>
      <View style={styles.quickGrid}>
        <QuickCard icon="leaf" title="Crop Health" subtitle="Scan plant disease" color="#d6f4e2" />
        <QuickCard icon="bug" title="Pest Alerts" subtitle="3 alerts nearby" color="#ffe8d0" />
        <QuickCard icon="tractor" title="Equipment" subtitle="Rent & share" color="#dce8ff" mci />
        <QuickCard icon="document-text" title="Schemes" subtitle="Government aid" color="#f0dcff" />
      </View>

      <Text style={styles.sectionTitle}>Farming Tips</Text>
      <View style={styles.tipCard}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=60' }}
          style={styles.tipImage}
        />
        <View style={styles.trendingBadge}>
          <Ionicons name="trending-up" size={12} color="#fff" />
          <Text style={styles.trendingText}>Trending</Text>
        </View>
        <Text style={styles.tipTitle}>Best Irrigation Practices for March</Text>
        <Text style={styles.tipBody}>
          Learn how to optimize water usage during the summer season and improve crop yield by 25%.
        </Text>
        <Text style={styles.readMore}>Read More -></Text>
      </View>

      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <ActivityCard icon="leaf" color="#d6f4e2" title="Disease Scan Completed" subtitle="Tomato plant - No disease detected" time="2 hours ago" />
      <ActivityCard icon="tractor" mci color="#dce8ff" title="Equipment Booking" subtitle="Tractor reserved for March 10" time="1 day ago" />
    </Page>
  );
}

function DiseaseScreen() {
  return (
    <Page>
      <TopHeader title="Plant Disease Detection" subtitle="AI-powered crop diagnosis" />
      <View style={styles.panelCard}>
        <View style={styles.centerIconCircle}>
          <Ionicons name="leaf" size={44} color="#15b84a" />
        </View>
        <Text style={styles.bigHeading}>Scan Your Plant</Text>
        <Text style={styles.muted}>Take a clear photo of the affected plant leaf for instant diagnosis</Text>
        <Pressable style={styles.greenButton}>
          <Feather name="camera" size={18} color="#fff" />
          <Text style={styles.greenButtonText}>Open Camera</Text>
        </Pressable>
        <Pressable style={styles.outlineButton}>
          <Feather name="upload" size={18} color="#1b2128" />
          <Text style={styles.outlineButtonText}>Upload from Gallery</Text>
        </Pressable>
      </View>

      <View style={styles.panelCard}>
        <Text style={styles.subHeading}>Tips for Best Results</Text>
        <TipLine no="1" text="Take photos in good natural lighting" />
        <TipLine no="2" text="Focus on the affected area of the leaf" />
        <TipLine no="3" text="Hold camera steady to avoid blur" />
        <TipLine no="4" text="Capture the entire leaf in the frame" />
      </View>
    </Page>
  );
}

function PestsScreen() {
  return (
    <Page>
      <TopHeader
        title="Pest Outbreak Alerts"
        subtitle="Real-time pest monitoring"
        right={
          <View>
            <Ionicons name="notifications-outline" size={21} color="#212936" />
            <View style={styles.redDot} />
          </View>
        }
      />
      <View style={styles.pillCard}>
        <Text style={styles.pillTitle}>Area Risk Level</Text>
        <View style={styles.riskRow}>
          <Text style={styles.muted}>Moderate risk in your area</Text>
          <Text style={styles.mutedStrong}>4 nearby alerts</Text>
        </View>
      </View>
      <View style={styles.mapCard}>
        <View style={styles.rowCenter}>
          <Ionicons name="map-outline" size={18} color="#3e4652" />
          <Text style={[styles.cardTitle, { marginLeft: 8 }]}>Area Pest Map</Text>
        </View>
        <View style={styles.mapPreview}>
          <View style={[styles.mapPin, { top: 12, left: 40 }]} />
          <View style={[styles.mapPin, { top: 34, left: 130 }]} />
          <View style={[styles.mapPin, { top: 62, left: 80 }]} />
        </View>
        <Text style={[styles.muted, { marginTop: 6 }]}>Village cluster shows medium risk zones and two high-risk hotspots.</Text>
      </View>

      <View style={styles.rowBetween}>
        <Text style={styles.sectionTitle}>Active Alerts</Text>
        <View style={styles.smallBadge}><Text style={styles.smallBadgeText}>4 nearby</Text></View>
      </View>
      <PestCard
        bg="#ffe5ea"
        title="Brown Plant Hopper"
        sub="Affects Rice crops"
        level="high"
        levelBg="#ff0e40"
        distance="2.3 km away"
        cases="12 cases"
        report="Reported 2 hours ago"
      />
      <PestCard
        bg="#ffefd7"
        title="Armyworm Infestation"
        sub="Affects Maize crops"
        level="medium"
        levelBg="#ff7f00"
        distance="5.7 km away"
        cases="8 cases"
        report="Reported 1 day ago"
      />
    </Page>
  );
}

function EquipmentScreen() {
  return (
    <Page>
      <TopHeader title="Equipment Sharing" subtitle="Rent or share farming tools" right={<Feather name="sliders" size={20} color="#1b2128" />} />
      <View style={styles.searchBar}>
        <Feather name="search" size={18} color="#9aa1ad" />
        <Text style={styles.searchText}>Search equipment...</Text>
      </View>

      <Text style={styles.sectionTitle}>Categories</Text>
      <View style={styles.chipsRow}>
        {chipData.map((item, idx) => (
          <View key={item} style={[styles.chip, idx === 0 && styles.chipActive]}>
            <Text style={[styles.chipText, idx === 0 && styles.chipTextActive]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={styles.rowBetween}>
        <Text style={styles.sectionTitle}>Available Equipment</Text>
        <Text style={styles.subtle}>3 available</Text>
      </View>
      <View style={styles.equipmentCard}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=500&q=60' }}
          style={styles.equipmentImage}
        />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.cardTitle}>Mahindra Tractor 575 DI</Text>
          <Text style={styles.muted}>Tractor</Text>
          <View style={styles.rowCenter}>
            <Ionicons name="star" size={14} color="#f2b518" />
            <Text style={[styles.rating, { marginTop: 0, marginLeft: 4 }]}>4.8 (24)</Text>
          </View>
          <View style={styles.rowCenter}>
            <Ionicons name="location-outline" size={14} color="#6c7481" />
            <Text style={[styles.muted, { marginLeft: 4 }]}>Nearby Village - 3.2 km</Text>
          </View>
          <Text style={styles.price}>{"\u20B9"}800/day</Text>
        </View>
      </View>

      <View style={styles.lightGreenCard}>
        <View style={styles.rowCenter}>
          <MaterialCommunityIcons name="tractor-variant" size={18} color="#14be49" />
          <Text style={[styles.subHeading, { marginLeft: 8 }]}>Have equipment to share?</Text>
        </View>
        <Text style={styles.muted}>List your farming equipment and earn extra income when not in use.</Text>
        <Pressable style={[styles.greenButton, { alignSelf: 'flex-start', marginTop: 12, paddingHorizontal: 16 }]}> 
          <Text style={styles.greenButtonText}>List Your Equipment</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>My Bookings</Text>
      <View style={styles.panelCard}>
        <Text style={styles.cardTitle}>Mahindra Tractor 575 DI</Text>
        <Text style={styles.muted}>Booked for March 10, 2026</Text>
        <Text style={[styles.muted, { marginTop: 4 }]}>1 day : {"\u20B9"}800</Text>
        <View style={styles.twoButtons}>
          <Pressable style={[styles.outlineButton, { flex: 1 }]}>
            <Text style={styles.outlineButtonText}>Cancel</Text>
          </Pressable>
          <Pressable style={[styles.greenButton, { flex: 1 }]}>
            <Text style={styles.greenButtonText}>View Details</Text>
          </Pressable>
        </View>
      </View>
    </Page>
  );
}

function SchemesScreen() {
  return (
    <Page>
      <View style={styles.schemeBanner}>
        <Text style={styles.schemeBannerTitle}>Government Schemes</Text>
        <Text style={styles.schemeBannerSub}>Agricultural subsidies and benefits</Text>
        <View style={styles.schemeBannerRow}>
          <View style={styles.bannerItem}>
            <Ionicons name="wallet-outline" size={13} color="#efe7ff" />
            <Text style={styles.bannerItemText}>Income Support</Text>
          </View>
          <View style={styles.bannerItem}>
            <Ionicons name="shield-checkmark-outline" size={13} color="#efe7ff" />
            <Text style={styles.bannerItemText}>Insurance</Text>
          </View>
          <View style={styles.bannerItem}>
            <Ionicons name="document-text-outline" size={13} color="#efe7ff" />
            <Text style={styles.bannerItemText}>Easy Apply</Text>
          </View>
        </View>
      </View>
      <View style={styles.schemeBar} />
      <View style={styles.lightGreenCard}>
        <View style={styles.rowCenter}>
          <Ionicons name="checkbox-outline" size={18} color="#14be49" />
          <Text style={[styles.subHeading, { marginLeft: 8 }]}>Check Your Eligibility</Text>
        </View>
        <Text style={styles.muted}>Find all government schemes you qualify for based on your farm details.</Text>
        <Pressable style={[styles.greenButton, { alignSelf: 'flex-start', paddingHorizontal: 16, marginTop: 12 }]}> 
          <Text style={styles.greenButtonText}>Check Eligibility</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Available Schemes</Text>
      <SchemeCard
        title="PM-KISAN"
        amount={"\u20B96,000/year"}
        deadline="March 31, 2026"
        benefits={['Three installments of \u20B92,000', 'Direct bank transfer', 'For landholding farmers']}
        eligible
      />
      <SchemeCard
        title="KCC"
        amount={"Up to \u20B93 Lakhs"}
        deadline="Ongoing"
        benefits={['Low interest rate (4% annually)', 'Flexible repayment', 'Insurance coverage']}
        eligible
      />

      <Text style={styles.sectionTitle}>My Applications</Text>
      <View style={styles.panelCard}>
        <View style={styles.rowBetween}>
          <Text style={styles.cardTitle}>PM-KISAN</Text>
          <View style={[styles.smallBadge, { backgroundColor: '#ffebad' }]}> 
            <Text style={{ color: '#8f6a00', fontWeight: '700' }}>Processing</Text>
          </View>
        </View>
        <Text style={styles.muted}>Applied on Feb 15, 2026</Text>
        <Text style={styles.muted}>Application ID: #PMK2026012345</Text>
        <Pressable style={[styles.outlineButton, { marginTop: 12 }]}> 
          <Text style={styles.outlineButtonText}>Track Application</Text>
        </Pressable>
      </View>

      <View style={[styles.panelCard, { backgroundColor: '#edf1fb' }]}> 
        <Text style={styles.subHeading}>Need Help?</Text>
        <Text style={[styles.muted, { marginTop: 8 }]}>Contact your local agriculture office or call the helpline for assistance with applications.</Text>
        <View style={styles.twoButtons}>
          <Pressable style={[styles.outlineButton, { flex: 1 }]}>
            <Text style={styles.outlineButtonText}>Call Helpline</Text>
          </Pressable>
          <Pressable style={[styles.outlineButton, { flex: 1 }]}>
            <Text style={styles.outlineButtonText}>Find Office</Text>
          </Pressable>
        </View>
      </View>
    </Page>
  );
}

function AssistantScreen() {
  return (
    <Page backgroundColor="#eef1fb">
      <TopHeader title="Voice Assistant" subtitle="Ask farming questions in your language" right={<Ionicons name="globe-outline" size={20} color="#1b2128" />} />
      <View style={styles.chipsRow}>
        {['GB English', 'IN Hindi', 'IN Tamil', 'IN Telugu', 'IN Kannada', 'IN Marathi'].map((x, i) => (
          <View key={x} style={[styles.chip, i === 2 && styles.languageChipActive]}>
            <Text style={[styles.chipText, i === 2 && { color: '#fff' }]}>{x}</Text>
          </View>
        ))}
      </View>

      <View style={styles.panelCard}>
        <View style={styles.centerIconBlue}>
          <Ionicons name="mic-outline" size={48} color="#fff" />
        </View>
        <Text style={styles.bigHeading}>Tap to Ask</Text>
        <Text style={styles.muted}>Ask any farming related question</Text>
      </View>

      <Text style={styles.sectionTitle}>Sample Questions</Text>
      <QuestionBox text="When is the right time to sow rice?" />
      <QuestionBox text="What are PM-KISAN benefits?" />
      <Text style={styles.sectionTitle}>Features</Text>
      <View style={styles.quickGrid}>
        <View style={styles.featureCardOne}>
          <Text style={styles.quickTitle}>Voice Input</Text>
          <Text style={styles.featureText}>Ask naturally in your language.</Text>
        </View>
        <View style={styles.featureCardTwo}>
          <Text style={styles.quickTitle}>Multilingual</Text>
          <Text style={styles.featureText}>Supports regional language prompts.</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Recent Conversation</Text>
      <View style={styles.chatCard}>
        <View style={[styles.messageBubble, { alignSelf: 'flex-end', backgroundColor: '#1759f6' }]}> 
          <Text style={{ color: '#fff', fontWeight: '700' }}>How much water does wheat need?</Text>
          <Text style={{ color: '#d5e2ff', marginTop: 6 }}>10:30 AM</Text>
        </View>
        <View style={[styles.messageBubble, { alignSelf: 'flex-start', backgroundColor: '#e8ebf2', marginTop: 14 }]}> 
          <Text style={{ color: '#1a2230' }}>Wheat usually needs 4 to 6 irrigations depending on soil and climate.</Text>
          <Text style={{ color: '#6f7784', marginTop: 6 }}>10:31 AM</Text>
        </View>
      </View>
    </Page>
  );
}

function InfoMetric({ icon, label, value }) {
  return (
    <View style={styles.metricItem}>
      {icon === 'wind' ? (
        <Feather name="wind" size={15} color="#d7f6e1" />
      ) : (
        <Ionicons name={icon} size={15} color="#d7f6e1" />
      )}
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

function QuickCard({ title, subtitle, color, icon, mci }) {
  return (
    <View style={styles.quickCard}>
      <View style={[styles.quickIcon, { backgroundColor: color }]}> 
        {mci ? (
          <MaterialCommunityIcons name={icon} size={20} color="#3a69d8" />
        ) : (
          <Ionicons name={icon} size={18} color="#15b84a" />
        )}
      </View>
      <Text style={styles.quickTitle}>{title}</Text>
      <Text style={styles.muted}>{subtitle}</Text>
    </View>
  );
}

function ActivityCard({ title, subtitle, time, icon, color, mci }) {
  return (
    <View style={styles.activityCard}>
      <View style={[styles.quickIcon, { backgroundColor: color }]}> 
        {mci ? <MaterialCommunityIcons name={icon} size={20} color="#3a69d8" /> : <Ionicons name={icon} size={18} color="#15b84a" />}
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.muted}>{subtitle}</Text>
        <Text style={[styles.subtle, { marginTop: 6 }]}>{time}</Text>
      </View>
    </View>
  );
}

function TipLine({ no, text }) {
  return (
    <View style={styles.tipLine}>
      <View style={styles.tipNo}><Text style={styles.tipNoText}>{no}</Text></View>
      <Text style={styles.muted}>{text}</Text>
    </View>
  );
}

function PestCard({ title, sub, level, levelBg, distance, cases, report, bg }) {
  return (
    <View style={[styles.pestCard, { backgroundColor: bg }]}> 
      <View style={styles.rowBetween}>
        <View style={styles.rowCenter}>
          <Ionicons name="warning-outline" size={20} color="#d15539" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.muted}>{sub}</Text>
          </View>
        </View>
        <View style={[styles.smallBadge, { backgroundColor: levelBg }]}> 
          <Text style={{ color: '#fff', fontWeight: '700' }}>{level}</Text>
        </View>
      </View>
      <View style={[styles.rowBetween, { marginTop: 12 }]}> 
        <Text style={styles.muted}>{distance}</Text>
        <Text style={styles.muted}>{cases}</Text>
      </View>
      <Text style={[styles.subtle, { marginTop: 8 }]}>{report}</Text>
      <Text style={[styles.subtle, { marginTop: 6 }]}>Recommended action: Inspect early morning and apply targeted bio-control spray.</Text>
      <Pressable style={[styles.outlineButton, { marginTop: 12, backgroundColor: '#fff' }]}> 
        <Text style={styles.outlineButtonText}>View Details & Treatment</Text>
      </Pressable>
    </View>
  );
}

function SchemeCard({ title, amount, deadline, eligible, benefits = [] }) {
  return (
    <View style={styles.panelCard}>
      <View style={styles.rowBetween}>
        <View style={styles.rowCenter}>
          <View style={[styles.quickIcon, { backgroundColor: '#efdfff' }]}> 
            <Feather name="file-text" size={18} color="#9025e4" />
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.muted}>Government Support Scheme</Text>
          </View>
        </View>
        <View style={[styles.smallBadge, { backgroundColor: eligible ? '#1dcf5f' : '#d8dde8' }]}> 
          <Text style={{ color: '#fff', fontWeight: '700' }}>{eligible ? 'Eligible' : 'Not Eligible'}</Text>
        </View>
      </View>
      <View style={styles.twoCols}>
        <View style={styles.flatBox}>
          <Text style={styles.subtle}>Amount</Text>
          <Text style={styles.cardTitle}>{amount}</Text>
        </View>
        <View style={styles.flatBox}>
          <Text style={styles.subtle}>Deadline</Text>
          <Text style={styles.cardTitle}>{deadline}</Text>
        </View>
      </View>
      <Text style={[styles.cardTitle, { marginTop: 10, fontSize: 14 }]}>Key Benefits:</Text>
      {benefits.map((benefit) => (
        <View key={benefit} style={[styles.rowCenter, { marginTop: 4 }]}>
          <Ionicons name="checkmark-circle-outline" size={14} color="#14be49" />
          <Text style={[styles.muted, { marginTop: 0, marginLeft: 6 }]}>{benefit}</Text>
        </View>
      ))}
      <View style={styles.twoButtons}>
        <Pressable style={[styles.outlineButton, { flex: 1 }]}> 
          <Text style={styles.outlineButtonText}>Learn More</Text>
        </Pressable>
        <Pressable style={[styles.purpleButton, { flex: 1 }]}> 
          <Text style={styles.greenButtonText}>Apply Now</Text>
        </Pressable>
      </View>
    </View>
  );
}

function QuestionBox({ text }) {
  return (
    <View style={styles.questionBox}>
      <Feather name="message-circle" size={17} color="#2f66f3" />
      <Text style={[styles.cardTitle, { marginLeft: 10, fontSize: 17 }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f7f8fa',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight || 0 : 0,
  },
  body: { flex: 1 },
  pageContent: { paddingBottom: 100, paddingTop: 2 },
  loaderRoot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e7f3e5',
    paddingHorizontal: 24,
  },
  loaderLogo: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7fff6',
    borderWidth: 2,
    borderColor: '#b9d9b4',
    overflow: 'hidden',
  },
  loaderLogoImage: {
    width: '100%',
    height: '100%',
  },
  loaderTitle: {
    marginTop: 14,
    fontSize: 30,
    fontWeight: '900',
    color: '#264d35',
    letterSpacing: 0.6,
  },
  loaderSub: {
    marginTop: 6,
    fontSize: 13,
    color: '#3f5d49',
    textAlign: 'center',
  },
  loaderTrack: {
    width: '86%',
    height: 10,
    borderRadius: 999,
    backgroundColor: '#d0e8cd',
    marginTop: 18,
    overflow: 'hidden',
  },
  loaderFill: {
    height: '100%',
    backgroundColor: '#2f6b3f',
  },
  loaderPct: {
    marginLeft: 6,
    marginTop: 10,
    fontSize: 12,
    color: '#2f6b3f',
    fontWeight: '700',
  },
  topRow: {
    paddingHorizontal: 14,
    paddingTop: 4,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#eceff3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowCenter: { flexDirection: 'row', alignItems: 'center' },
  screenTitle: { fontSize: 18, fontWeight: '800', color: '#101722', flexShrink: 1 },
  screenSubtitle: { fontSize: 12, color: '#6d7582', marginTop: 2 },
  homeHero: {
    padding: 16,
    backgroundColor: '#09b03a',
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  heroBrand: { color: '#fff', fontSize: 24, fontWeight: '800' },
  heroSub: { color: '#d9f3df', fontSize: 13, marginTop: 2 },
  homeLogo: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#e7f3e5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  homeLogoImage: {
    width: '100%',
    height: '100%',
  },
  heroIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherCard: {
    marginTop: 16,
    borderRadius: 18,
    padding: 16,
    backgroundColor: '#1ebe4f',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  weatherTiny: { color: '#dbf5e2', fontSize: 14, fontWeight: '600' },
  weatherTemp: { color: '#fff', fontSize: 34, fontWeight: '800', marginVertical: 8 },
  weatherStats: { marginTop: 12, flexDirection: 'row', justifyContent: 'space-between' },
  metricItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metricLabel: { color: '#ddf6e5', fontSize: 12 },
  metricValue: { color: '#fff', fontSize: 13, fontWeight: '700' },
  warningBanner: {
    marginHorizontal: 12,
    marginTop: 12,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#f3d5bc',
    backgroundColor: '#fff7ed',
    flexDirection: 'row',
  },
  warnTitle: { fontSize: 16, fontWeight: '700', color: '#6f3b14' },
  warnSub: { marginTop: 3, fontSize: 13, color: '#8e613f', maxWidth: 280 },
  sectionTitle: { fontSize: 19, fontWeight: '800', color: '#151d29', marginHorizontal: 12, marginTop: 16, marginBottom: 10, flexShrink: 1 },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 6 },
  quickCard: {
    width: '48%',
    margin: '1%',
    borderRadius: 14,
    backgroundColor: '#fff',
    padding: 12,
    minHeight: 130,
    borderWidth: 1,
    borderColor: '#eef0f4',
  },
  quickIcon: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  quickTitle: { marginTop: 10, fontSize: 17, fontWeight: '800', color: '#141d2a' },
  tipCard: {
    marginHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#edf0f4',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  tipImage: { width: '100%', height: 180 },
  trendingBadge: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#16b948',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  trendingText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  tipTitle: { marginTop: 12, marginHorizontal: 12, fontSize: 22, fontWeight: '800', color: '#121a27' },
  tipBody: { marginHorizontal: 12, marginTop: 6, fontSize: 14, color: '#626a77', lineHeight: 20 },
  readMore: { marginHorizontal: 12, marginVertical: 12, fontSize: 15, color: '#16b948', fontWeight: '700' },
  activityCard: {
    marginHorizontal: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#edf0f4',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  panelCard: {
    marginHorizontal: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#eceff3',
    borderRadius: 14,
    backgroundColor: '#fff',
    padding: 12,
  },
  centerIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#def9e6',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 6,
  },
  centerIconBlue: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1f60ff',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 8,
  },
  bigHeading: { textAlign: 'center', fontSize: 28, fontWeight: '800', color: '#151d2a', marginTop: 14 },
  muted: { fontSize: 14, color: '#646d79', marginTop: 4 },
  subtle: { fontSize: 12, color: '#8e95a2' },
  subHeading: { fontSize: 18, fontWeight: '800', color: '#131b28' },
  greenButton: {
    marginTop: 12,
    height: 54,
    borderRadius: 10,
    backgroundColor: '#14be49',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  greenButtonText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  outlineButton: {
    marginTop: 10,
    height: 54,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e5ec',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  outlineButtonText: { fontSize: 15, color: '#18202d', fontWeight: '600' },
  tipLine: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  tipNo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#dff8e8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  tipNoText: { color: '#14be49', fontWeight: '800' },
  redDot: {
    position: 'absolute',
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#ff2d55',
    right: -1,
    top: 1,
  },
  pillCard: {
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ebeff4',
    padding: 12,
    backgroundColor: '#fff',
  },
  pillTitle: { fontSize: 18, fontWeight: '800', color: '#18202e' },
  riskRow: { marginTop: 8, flexDirection: 'row', justifyContent: 'space-between' },
  mutedStrong: { fontSize: 14, color: '#3e4652', fontWeight: '600' },
  smallBadge: {
    borderRadius: 999,
    paddingHorizontal: 11,
    paddingVertical: 5,
    backgroundColor: '#f2f5fa',
  },
  smallBadgeText: { fontSize: 12, color: '#8d5461', fontWeight: '700' },
  pestCard: {
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#f1e4e7',
    padding: 12,
  },
  mapCard: {
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ebeff4',
    padding: 12,
    backgroundColor: '#fff',
  },
  mapPreview: {
    height: 100,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#e8f2e9',
    borderWidth: 1,
    borderColor: '#d4e7d7',
    overflow: 'hidden',
  },
  mapPin: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#ff375f',
    borderWidth: 2,
    borderColor: '#fff',
  },
  searchBar: {
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 12,
    backgroundColor: '#f2f4f7',
    borderWidth: 1,
    borderColor: '#edf0f4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 50,
  },
  searchText: { marginLeft: 8, color: '#9aa1ad', fontSize: 14 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginHorizontal: 12, marginTop: 10 },
  chip: {
    backgroundColor: '#f2f4f7',
    borderWidth: 1,
    borderColor: '#e9edf2',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipActive: { backgroundColor: '#14be49' },
  chipText: { color: '#2a323f', fontSize: 13, fontWeight: '600' },
  chipTextActive: { color: '#fff' },
  languageChipActive: { backgroundColor: '#1f60ff' },
  equipmentCard: {
    marginHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#eceff3',
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
  },
  equipmentImage: { width: 95, height: 95, borderRadius: 8 },
  cardTitle: { fontSize: 18, color: '#131b28', fontWeight: '800', flexShrink: 1 },
  rating: { marginTop: 6, fontSize: 13, color: '#222c39', fontWeight: '700' },
  price: { marginTop: 10, fontSize: 24, color: '#14be49', fontWeight: '900' },
  lightGreenCard: {
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#d8f2df',
    padding: 12,
    backgroundColor: '#eefcf2',
  },
  twoButtons: { flexDirection: 'row', gap: 8, marginTop: 10 },
  schemeBanner: {
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 14,
    padding: 12,
    backgroundColor: '#6e35ff',
  },
  schemeBannerTitle: { color: '#fff', fontSize: 17, fontWeight: '800' },
  schemeBannerSub: { color: '#ece2ff', fontSize: 12, marginTop: 3 },
  schemeBannerRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  bannerItemText: { color: '#f4eeff', fontSize: 11, fontWeight: '600' },
  schemeBar: {
    marginTop: 10,
    marginHorizontal: 12,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#8339ff',
  },
  twoCols: { flexDirection: 'row', gap: 8, marginTop: 12 },
  flatBox: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#f4f6f9',
    borderWidth: 1,
    borderColor: '#edf0f4',
    padding: 10,
  },
  purpleButton: {
    marginTop: 10,
    height: 54,
    borderRadius: 10,
    backgroundColor: '#8924ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionBox: {
    marginHorizontal: 12,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#73a4ff',
    backgroundColor: '#f2f7ff',
    paddingHorizontal: 12,
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureCardOne: {
    width: '48%',
    margin: '1%',
    borderRadius: 14,
    padding: 12,
    minHeight: 110,
    borderWidth: 1,
    borderColor: '#cfe7ff',
    backgroundColor: '#e8f4ff',
  },
  featureCardTwo: {
    width: '48%',
    margin: '1%',
    borderRadius: 14,
    padding: 12,
    minHeight: 110,
    borderWidth: 1,
    borderColor: '#d6ebda',
    backgroundColor: '#e9fced',
  },
  featureText: { marginTop: 4, fontSize: 13, color: '#435063' },
  chatCard: {
    marginHorizontal: 12,
    borderRadius: 14,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e8ecf4',
    padding: 12,
  },
  messageBubble: {
    borderRadius: 14,
    maxWidth: '84%',
    padding: 12,
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 78,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e8ebf1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabItem: { alignItems: 'center', justifyContent: 'center' },
  tabLabel: { marginTop: 3, fontSize: 12, color: '#7d8590', fontWeight: '600' },
  tabLabelActive: { color: '#15b84a' },
});
