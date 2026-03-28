import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Play, Zap, Shield, Tv } from "lucide-react";

export default function Home() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">FaselHD</div>
          <Button
            onClick={() => navigate("/configure")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Install Addon
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold text-white">
          Stream FaselHD Content in Stremio
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Watch your favorite movies and series from FaselHD directly through Stremio with seamless integration and zero ads.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Button
            onClick={() => navigate("/configure")}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          >
            <Play className="w-5 h-5 mr-2" />
            Get Started
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-slate-600 hover:bg-slate-800 text-white px-8"
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Why Choose FaselHD Addon?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 transition">
            <CardHeader>
              <Play className="w-8 h-8 text-blue-400 mb-2" />
              <CardTitle className="text-white">Instant Streaming</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300">
              Start watching your favorite content immediately with one-click installation
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 transition">
            <CardHeader>
              <Zap className="w-8 h-8 text-yellow-400 mb-2" />
              <CardTitle className="text-white">Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300">
              Optimized for speed with minimal latency and quick stream loading
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 transition">
            <CardHeader>
              <Shield className="w-8 h-8 text-green-400 mb-2" />
              <CardTitle className="text-white">No Ads</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300">
              Enjoy uninterrupted viewing without advertisements or tracking
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 transition">
            <CardHeader>
              <Tv className="w-8 h-8 text-purple-400 mb-2" />
              <CardTitle className="text-white">Full Support</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300">
              Movies, series, and episodes all supported with automatic metadata
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Content Types Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Supported Content</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Movies</CardTitle>
              <CardDescription className="text-slate-400">
                Stream thousands of movies in HD and 4K quality
              </CardDescription>
            </CardHeader>
            <CardContent className="text-slate-300">
              <ul className="space-y-2">
                <li>✓ Latest releases</li>
                <li>✓ Classic films</li>
                <li>✓ Multiple quality options</li>
                <li>✓ Automatic metadata</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Series</CardTitle>
              <CardDescription className="text-slate-400">
                Watch complete TV series with episode tracking
              </CardDescription>
            </CardHeader>
            <CardContent className="text-slate-300">
              <ul className="space-y-2">
                <li>✓ Full seasons</li>
                <li>✓ Individual episodes</li>
                <li>✓ Progress tracking</li>
                <li>✓ Season organization</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto text-white font-bold text-lg">
              1
            </div>
            <h3 className="text-xl font-semibold text-white">Install Addon</h3>
            <p className="text-slate-300">
              Click the install button and follow the simple setup process
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto text-white font-bold text-lg">
              2
            </div>
            <h3 className="text-xl font-semibold text-white">Search Content</h3>
            <p className="text-slate-300">
              Find your favorite movies and series using Stremio's search
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto text-white font-bold text-lg">
              3
            </div>
            <h3 className="text-xl font-semibold text-white">Start Watching</h3>
            <p className="text-slate-300">
              Select a stream and enjoy your content immediately
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0">
          <CardContent className="pt-12 pb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-blue-100 mb-8 text-lg">
              Install the FaselHD addon now and start streaming your favorite content
            </p>
            <Button
              onClick={() => navigate("/configure")}
              size="lg"
              className="bg-white hover:bg-slate-100 text-blue-600 px-8"
            >
              Install Now
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-slate-400">
          <p>FaselHD Stremio Addon • Version 1.0.0</p>
          <p className="text-sm mt-2">
            This addon integrates FaselHD content with Stremio for seamless streaming
          </p>
        </div>
      </footer>
    </div>
  );
}
