import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

export default function Configure() {
  const [copied, setCopied] = useState(false);
  
  // Get the current domain from window location
  const manifestUrl = `${window.location.protocol}//${window.location.host}/api/stremio/manifest.json`;

  const handleCopyManifest = () => {
    navigator.clipboard.writeText(manifestUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInstallStremio = () => {
    // Stremio addon installation URL format
    const stremioInstallUrl = `stremio://${btoa(manifestUrl)}`;
    window.location.href = stremioInstallUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <a href="/" className="text-2xl font-bold text-white hover:text-blue-400 transition">
            ← Back
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-2">Install FaselHD Addon</h1>
        <p className="text-slate-300 mb-12">
          Choose your preferred installation method below
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Method 1: One-Click Installation */}
          <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 transition">
            <CardHeader>
              <CardTitle className="text-white">Method 1: One-Click Install</CardTitle>
              <CardDescription className="text-slate-400">
                Fastest and easiest way
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300">
                Click the button below to automatically add the addon to Stremio.
              </p>
              <Button
                onClick={handleInstallStremio}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Install in Stremio
              </Button>
              <p className="text-xs text-slate-400">
                This will open Stremio and add the addon automatically
              </p>
            </CardContent>
          </Card>

          {/* Method 2: Manual Installation */}
          <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 transition">
            <CardHeader>
              <CardTitle className="text-white">Method 2: Manual Install</CardTitle>
              <CardDescription className="text-slate-400">
                For manual configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300">
                Copy the manifest URL and paste it in Stremio's addon installer.
              </p>
              <Button
                onClick={handleCopyManifest}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Manifest URL
                  </>
                )}
              </Button>
              <p className="text-xs text-slate-400">
                URL copied to clipboard
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Manifest URL Display */}
        <Card className="bg-slate-800 border-slate-700 mb-12">
          <CardHeader>
            <CardTitle className="text-white">Manifest URL</CardTitle>
            <CardDescription className="text-slate-400">
              Use this URL for manual installation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900 rounded p-4 font-mono text-sm text-slate-300 break-all">
              {manifestUrl}
            </div>
          </CardContent>
        </Card>

        {/* Installation Steps */}
        <Card className="bg-slate-800 border-slate-700 mb-12">
          <CardHeader>
            <CardTitle className="text-white">Manual Installation Steps</CardTitle>
            <CardDescription className="text-slate-400">
              If one-click installation doesn't work
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-white font-semibold">Open Stremio</h4>
                  <p className="text-slate-400 text-sm">
                    Launch the Stremio application on your device
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-white font-semibold">Go to Add-ons</h4>
                  <p className="text-slate-400 text-sm">
                    Click on the "Add-ons" tab at the bottom of the screen
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-white font-semibold">Click Discover</h4>
                  <p className="text-slate-400 text-sm">
                    Navigate to the "Discover" section in Add-ons
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="text-white font-semibold">Click the "+" Icon</h4>
                  <p className="text-slate-400 text-sm">
                    Look for the plus icon to add a new addon
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  5
                </div>
                <div>
                  <h4 className="text-white font-semibold">Paste the URL</h4>
                  <p className="text-slate-400 text-sm">
                    Paste the manifest URL from above and press Enter
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  6
                </div>
                <div>
                  <h4 className="text-white font-semibold">Click Install</h4>
                  <p className="text-slate-400 text-sm">
                    Confirm the installation and wait for it to complete
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Troubleshooting</CardTitle>
            <CardDescription className="text-slate-400">
              Having issues? Try these solutions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-white font-semibold mb-2">Installation Failed?</h4>
              <ul className="text-slate-300 text-sm space-y-1 list-disc list-inside">
                <li>Make sure you're using the latest version of Stremio</li>
                <li>Check your internet connection</li>
                <li>Try the manual installation method</li>
                <li>Clear Stremio cache and restart the app</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2">No Streams Found?</h4>
              <ul className="text-slate-300 text-sm space-y-1 list-disc list-inside">
                <li>Verify the content exists on FaselHD</li>
                <li>Try searching for the movie/series in Stremio</li>
                <li>Check if FaselHD API is accessible</li>
                <li>Try a different content title</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2">Still Having Issues?</h4>
              <p className="text-slate-300 text-sm">
                Make sure the manifest URL uses HTTPS (not HTTP) and that your Stremio version is up to date.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Info Box */}
        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6 mt-12">
          <h3 className="text-white font-semibold mb-2">ℹ️ Important Information</h3>
          <ul className="text-slate-300 text-sm space-y-2 list-disc list-inside">
            <li>This addon requires an active internet connection</li>
            <li>Stream availability depends on FaselHD's content library</li>
            <li>The addon is free and open-source</li>
            <li>No personal data is collected or stored</li>
            <li>Always use HTTPS for secure connections</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center text-slate-400">
          <p>FaselHD Stremio Addon • Version 1.0.0</p>
          <p className="text-sm mt-2">
            For more information, visit the documentation
          </p>
        </div>
      </footer>
    </div>
  );
}
