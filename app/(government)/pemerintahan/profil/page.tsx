"use client";

import { useTranslations } from "next-intl";
import { Landmark, History, Target, Map } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/landing-header";
import { Footer } from "@/components/layout/landing-footer";

export default function ProfilePage() {
  const t = useTranslations("Government.profile");

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-800 to-emerald-900 py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Landmark className="h-8 w-8" />
            </div>
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">
              {t("title")}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/80">
              {t("subtitle")}
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="container mx-auto px-4 py-12">
          <Tabs defaultValue="history" className="w-full">
            <div className="mb-8 flex justify-center">
              <TabsList className="bg-white/50 backdrop-blur-sm">
                <TabsTrigger value="history" className="gap-2">
                  <History className="h-4 w-4" />
                  {t("tabs.history")}
                </TabsTrigger>
                <TabsTrigger value="vision" className="gap-2">
                  <Target className="h-4 w-4" />
                  {t("tabs.visionMission")}
                </TabsTrigger>
                <TabsTrigger value="geography" className="gap-2">
                  <Map className="h-4 w-4" />
                  {t("tabs.geography")}
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>{t("history")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 leading-relaxed text-slate-600">
                  <p>
                    Kabupaten Naiera memiliki sejarah panjang yang dimulai sejak
                    era kerajaan kuno. Nama "Naiera" sendiri berasal dari bahasa
                    lokal yang berarti "Tanah Harapan".
                  </p>
                  <p>
                    Pada tahun 1950, Kabupaten Naiera resmi terbentuk sebagai
                    wilayah administratif di bawah pemerintahan Republik
                    Indonesia. Sejak saat itu, Naiera terus berkembang menjadi
                    salah satu pusat pertumbuhan ekonomi dan budaya di wilayah
                    ini.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vision">
              <div className="grid gap-6 md:grid-cols-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-primary-hover">
                      {t("vision")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <blockquote className="border-l-4 border-primary pl-4 text-xl font-medium text-slate-800 italic">
                      "Terwujudnya Kabupaten Naiera yang Maju, Sejahtera, dan
                      Berbudaya berbasis Teknologi Digital pada tahun 2030"
                    </blockquote>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-primary-hover">
                      {t("mission")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc space-y-3 pl-5 text-slate-700">
                      <li>
                        Meningkatkan kualitas sumber daya manusia yang berdaya
                        saing.
                      </li>
                      <li>
                        Mengembangkan infrastruktur daerah yang merata dan
                        berkelanjutan.
                      </li>
                      <li>
                        Mewujudkan tata kelola pemerintahan yang bersih,
                        transparan, dan akuntabel.
                      </li>
                      <li>
                        Memperkuat ekonomi kerakyatan berbasis potensi lokal.
                      </li>
                      <li>
                        Melestarikan nilai-nilai budaya dan kearifan lokal.
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="geography">
              <Card>
                <CardHeader>
                  <CardTitle>{t("geography")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="aspect-video w-full overflow-hidden rounded-lg bg-slate-200">
                    <div className="flex h-full items-center justify-center text-slate-400">
                      <Map className="mr-2 h-6 w-6" />
                      Peta Wilayah Kabupaten Naiera
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg bg-primary-lighter p-4 text-center">
                      <p className="text-sm text-slate-500">Luas Wilayah</p>
                      <p className="text-xl font-bold text-primary-hover">
                        1,234 km²
                      </p>
                    </div>
                    <div className="rounded-lg bg-primary-lighter p-4 text-center">
                      <p className="text-sm text-slate-500">Jumlah Penduduk</p>
                      <p className="text-xl font-bold text-primary-hover">
                        540,321 Jiwa
                      </p>
                    </div>
                    <div className="rounded-lg bg-primary-lighter p-4 text-center">
                      <p className="text-sm text-slate-500">Kecamatan</p>
                      <p className="text-xl font-bold text-primary-hover">15</p>
                    </div>
                    <div className="rounded-lg bg-primary-lighter p-4 text-center">
                      <p className="text-sm text-slate-500">Desa/Kelurahan</p>
                      <p className="text-xl font-bold text-primary-hover">145</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </>
  );
}
