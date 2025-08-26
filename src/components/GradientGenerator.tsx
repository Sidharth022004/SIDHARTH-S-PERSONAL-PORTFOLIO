import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Copy, Download } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface GradientStop {
  color: string;
  position: number;
}

const GradientGenerator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
  const [angle, setAngle] = useState(90);
  const [stops, setStops] = useState<GradientStop[]>([
    { color: '#3b82f6', position: 0 },
    { color: '#8b5cf6', position: 100 }
  ]);
  const [gradientCSS, setGradientCSS] = useState('');
  const [previewStyle, setPreviewStyle] = useState<React.CSSProperties>({});

  // Generate gradient CSS and preview style
  useEffect(() => {
    let cssGradient = '';
    
    if (gradientType === 'linear') {
      const colors = stops
        .sort((a, b) => a.position - b.position)
        .map(stop => `${stop.color} ${stop.position}%`)
        .join(', ');
      cssGradient = `linear-gradient(${angle}deg, ${colors})`;
    } else {
      const colors = stops
        .sort((a, b) => a.position - b.position)
        .map(stop => `${stop.color} ${stop.position}%`)
        .join(', ');
      cssGradient = `radial-gradient(${colors})`;
    }
    
    setGradientCSS(cssGradient);
    setPreviewStyle({
      background: cssGradient
    });
  }, [gradientType, angle, stops]);

  // Add a new color stop
  const addStop = () => {
    if (stops.length >= 5) {
      toast({
        title: "Maximum stops reached",
        description: "You can only add up to 5 color stops.",
        variant: "destructive"
      });
      return;
    }
    
    const newStops = [...stops];
    // Add stop at midpoint of last two stops or at 50% if only one stop
    let newPosition = 50;
    if (newStops.length > 1) {
      const lastStop = newStops[newStops.length - 1];
      const secondLastStop = newStops[newStops.length - 2];
      newPosition = Math.round((lastStop.position + secondLastStop.position) / 2);
    }
    
    newStops.push({
      color: '#ef4444',
      position: newPosition
    });
    
    setStops(newStops);
  };

  // Update a color stop
  const updateStop = (index: number, field: 'color' | 'position', value: string | number) => {
    const newStops = [...stops];
    if (field === 'color') {
      newStops[index].color = value as string;
    } else {
      newStops[index].position = value as number;
    }
    setStops(newStops);
  };

  // Remove a color stop
  const removeStop = (index: number) => {
    if (stops.length <= 2) {
      toast({
        title: "Minimum stops required",
        description: "You need at least 2 color stops.",
        variant: "destructive"
      });
      return;
    }
    
    const newStops = stops.filter((_, i) => i !== index);
    setStops(newStops);
  };

  // Copy CSS to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`background: ${gradientCSS};`);
    toast({
      title: "CSS Copied",
      description: "The gradient CSS has been copied to your clipboard."
    });
  };

  // Export CSS to file
  const exportCSS = () => {
    const cssContent = `.gradient-background {
  background: ${gradientCSS};
}`;
    
    const blob = new Blob([cssContent], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gradient.css';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "CSS Exported",
      description: "The gradient CSS has been downloaded as gradient.css."
    });
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg"
        size="icon"
      >
        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">CSS Gradient Generator</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Controls Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gradient Type</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-4">
                    <Button
                      variant={gradientType === 'linear' ? 'default' : 'outline'}
                      onClick={() => setGradientType('linear')}
                    >
                      Linear
                    </Button>
                    <Button
                      variant={gradientType === 'radial' ? 'default' : 'outline'}
                      onClick={() => setGradientType('radial')}
                    >
                      Radial
                    </Button>
                  </div>
                  
                  {gradientType === 'linear' && (
                    <div className="space-y-2">
                      <Label>Angle: {angle}°</Label>
                      <Slider
                        value={[angle]}
                        onValueChange={(value) => setAngle(value[0])}
                        min={0}
                        max={360}
                        step={1}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Color Stops</span>
                    <Button onClick={addStop} size="sm">Add Stop</Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stops
                    .sort((a, b) => a.position - b.position)
                    .map((stop, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full border" style={{ backgroundColor: stop.color }} />
                        <Input
                          type="color"
                          value={stop.color}
                          onChange={(e) => updateStop(index, 'color', e.target.value)}
                          className="w-16 h-10 p-1"
                        />
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={stop.position}
                          onChange={(e) => updateStop(index, 'position', parseInt(e.target.value) || 0)}
                          className="w-20"
                        />
                        <span className="text-sm">%</span>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeStop(index)}
                          disabled={stops.length <= 2}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>CSS Output</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-4 rounded-md font-mono text-sm">
                    background: {gradientCSS};
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={copyToClipboard} className="flex-1">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy CSS
                    </Button>
                    <Button onClick={exportCSS} variant="secondary" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Export CSS
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Preview Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Live Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="w-full h-64 rounded-lg border-2 border-dashed flex items-center justify-center"
                    style={previewStyle}
                  >
                    <span className="bg-white/80 dark:bg-black/80 px-4 py-2 rounded-md font-medium">
                      Gradient Preview
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Usage Examples</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">As Background:</h4>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm">
                      .my-element &#123;<br />
                      &nbsp;&nbsp;background: {gradientCSS};<br />
                      &#125;
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">As Text Gradient:</h4>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm">
                      .my-text &#123;<br />
                      &nbsp;&nbsp;background: {gradientCSS};<br />
                      &nbsp;&nbsp;-webkit-background-clip: text;<br />
                      &nbsp;&nbsp;-webkit-text-fill-color: transparent;<br />
                      &#125;
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GradientGenerator;