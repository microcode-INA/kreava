#import <Foundation/Foundation.h>
#import <Vision/Vision.h>
#import <ImageIO/ImageIO.h>

int main(int argc, const char * argv[]) {
  @autoreleasepool {
    NSString *root = argc > 1 ? [NSString stringWithUTF8String:argv[1]] : @"/Users/mac/Documents/SAAS/! Kreava/Template";
    NSString *output = argc > 2 ? [NSString stringWithUTF8String:argv[2]] : @"/private/tmp/kreava-template-ocr.json";
    NSFileManager *fm = [NSFileManager defaultManager];
    NSDirectoryEnumerator *walker = [fm enumeratorAtPath:root];
    NSMutableArray *records = [NSMutableArray array];
    NSString *relative;

    while ((relative = [walker nextObject])) {
      if (![[relative pathExtension].lowercaseString isEqualToString:@"png"]) continue;
      @autoreleasepool {
        NSString *path = [root stringByAppendingPathComponent:relative];
        NSURL *url = [NSURL fileURLWithPath:path];
        CGImageSourceRef source = CGImageSourceCreateWithURL((__bridge CFURLRef)url, NULL);
        if (!source) continue;
        NSDictionary *props = CFBridgingRelease(CGImageSourceCopyPropertiesAtIndex(source, 0, NULL));
        CGImageRef image = CGImageSourceCreateImageAtIndex(source, 0, NULL);
        if (!image) { CFRelease(source); continue; }

        VNRecognizeTextRequest *request = [[VNRecognizeTextRequest alloc] init];
        request.recognitionLevel = VNRequestTextRecognitionLevelFast;
        request.usesLanguageCorrection = NO;
        request.recognitionLanguages = @[@"id-ID", @"en-US"];
        VNImageRequestHandler *handler = [[VNImageRequestHandler alloc] initWithCGImage:image options:@{}];
        [handler performRequests:@[request] error:nil];
        NSMutableArray *parts = [NSMutableArray array];
        for (VNRecognizedTextObservation *observation in request.results ?: @[]) {
          VNRecognizedText *candidate = [[observation topCandidates:1] firstObject];
          if (candidate.string.length) [parts addObject:candidate.string];
        }
        [records addObject:@{
          @"path": relative,
          @"width": props[(NSString *)kCGImagePropertyPixelWidth] ?: @0,
          @"height": props[(NSString *)kCGImagePropertyPixelHeight] ?: @0,
          @"text": [parts componentsJoinedByString:@" "]
        }];
        CGImageRelease(image);
        CFRelease(source);
        if (records.count % 50 == 0) fprintf(stderr, "Processed %lu\n", (unsigned long)records.count);
      }
    }

    NSData *json = [NSJSONSerialization dataWithJSONObject:records options:0 error:nil];
    [json writeToFile:output atomically:YES];
    printf("Wrote %lu records to %s\n", (unsigned long)records.count, output.UTF8String);
  }
  return 0;
}
