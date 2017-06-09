/* tslint:disable:no-unused-variable */

import { TestBed, inject, fakeAsync, async, tick } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions, RequestMethod,
  Response, ResponseOptions } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { BlogService } from './blog.service';
import { BlogEntry } from './blog-entry';
import { User } from '../user/user';

const blogEntryStub: BlogEntry = {
  title: 'Test blog entry',
  content: 'Test content',
  created: new Date(),
  _id: 'objectid',
  slug: 'test-blog-entry'
};
const blogListStub = [blogEntryStub];
const slug = 'test-blog-entry';
// tslint:disable-next-line
const jwt = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODk4ZTg3MzFhYTM5Nzc5NTk4OTY1NjIiLCJpYXQiOjE0ODgzMDUwMDYsImV4cCI6MTQ4ODMxMjIwNn0.Mk41xT9GHchIzkI2NQQF_jWymmNpIcVB1YJFaL5Olho';
let service;
let mockBackend;

describe('BlogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, defaultOptions) =>
            new Http(backend, defaultOptions),
          deps: [MockBackend, BaseRequestOptions]
        },
        {
          provide: AuthHttp,
          useExisting: Http
        },
        {
          provide: Router,
          useValue: {
            navigate: () => true,
            navigateByUrl: () => true
          }
        },
        BlogService
      ]
    });
  });

  beforeEach(inject([BlogService, MockBackend], (b, m) => {
    service = b;
    mockBackend = m;
  }));

  beforeAll(() => {
    // Set token for auth requests
    localStorage.setItem('id_token', jwt);
  });

  afterAll(() => {
    localStorage.removeItem('id_token');
  });

  it('loads correctly', () => {
    expect(service).toBeTruthy();
  });

  describe('#createBlogEntry()', () => {
    it('calls the correct api url', fakeAsync(() => {
      const expectedUrl = `/api/blog`;
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe(expectedUrl);
      });
      service.createBlogEntry(blogEntryStub);
      tick();
    }));

    it('uses the POST request method', fakeAsync(() => {
      mockBackend.connections.subscribe(c => {
        expect(c.request.method).toBe(RequestMethod.Post);
      });
      service.createBlogEntry(blogEntryStub);
      tick();
    }));

    it('creates the blog entry', fakeAsync(() => {
      mockBackend.connections.subscribe(c => {
        expect(c.request._body).toBe(blogEntryStub);
      });
      service.createBlogEntry(blogEntryStub);
      tick();
    }));

    it('navigates to correct url upon creation success', fakeAsync(() => {
      const responseStub = Object.assign({}, blogEntryStub, {slug});
      const router = TestBed.get(Router);
      spyOn(router, 'navigate');
      mockBackend.connections.subscribe(c => {
        const response = new ResponseOptions({
          body: JSON.stringify(responseStub)
        });
        c.mockRespond(new Response(response));
      });
      service.createBlogEntry(blogEntryStub);
      tick();
      expect(router.navigate).toHaveBeenCalledWith(['/blog', responseStub.slug]);
    }));

    it('failed creation should cause error field to be filled with msg',
       fakeAsync(() => {
      const failResponse = {
        msg: 'Creation failed'
      };
      mockBackend.connections.subscribe(c => {
        const response = new ResponseOptions({
          body: JSON.stringify(failResponse)
        });
        c.mockError(new Response(response));
      });
      service.createBlogEntry(blogEntryStub);
      expect(service.error).toBe(failResponse.msg);
      tick();
    }));
  });

  describe('#deleteBlogEntry()', () => {
    it('calls the correct api url', fakeAsync(() => {
      const expectedUrl = `/api/blog/${blogEntryStub.slug}`;
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe(expectedUrl);
      });
      service.deleteBlogEntry(blogEntryStub);
      tick();
    }));

    it('uses the DELETE request method', fakeAsync(() => {
      mockBackend.connections.subscribe(c => {
        expect(c.request.method).toBe(RequestMethod.Delete);
      });
      service.deleteBlogEntry(blogEntryStub);
      tick();
    }));

    it('deletes the blog entry', fakeAsync(() => {
      mockBackend.connections.subscribe(c => {
        expect(c.request._body).toBeFalsy();
      });
      service.deleteBlogEntry(blogEntryStub);
      tick();
    }));

    // it('navigates to correct url upon delete success', fakeAsync(() => {
    //   const responseStub = Object.assign({}, blogEntryStub, {slug});
    //   const router = TestBed.get(Router);
    //   spyOn(router, 'navigate');
    //   mockBackend.connections.subscribe(c => {
    //     const response = new ResponseOptions({body: 'null'});
    //     c.mockRespond(new Response(response));
    //   });
    //   service.deleteBlogEntry(blogEntryStub);
    //   tick();
    //   expect(router.navigate).toHaveBeenCalledWith(['/blog/list']);
    // }));
    //
    // it('failed deletion should cause error field to be filled with msg',
    //    fakeAsync(() => {
    //   const failResponse = {
    //     msg: 'Deletion failed'
    //   };
    //   mockBackend.connections.subscribe(c => {
    //     const response = new ResponseOptions({
    //       body: JSON.stringify(failResponse)
    //     });
    //     c.mockError(new Response(response));
    //   });
    //   service.deleteBlogEntry(blogEntryStub);
    //   expect(service.error).toBe(failResponse.msg);
    //   tick();
    // }));
  });

  describe('#getBlogEntryBySlug()', () => {
    it('calls the correct api url', fakeAsync(() => {
      const expectedUrl = `/api/blog/${slug}`;
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe(expectedUrl);
      });
      service.getBlogEntryBySlug(slug);
      tick();
    }));

    it('uses the GET request method', fakeAsync(() => {
      mockBackend.connections.subscribe(c => {
        expect(c.request.method).toBe(RequestMethod.Get);
      });
      service.getBlogEntryBySlug('test');
      tick();
    }));

    it('returns the correct blog entry', fakeAsync(() => {
      mockBackend.connections.subscribe(c => {
        const response = new ResponseOptions({
          body: JSON.stringify(blogEntryStub)
        });
        c.mockRespond(new Response(response));
      });
      service.getBlogEntryBySlug('test')
        .then(blogEntry => {
          expect(blogEntry.title).toEqual(blogEntryStub.title);
          expect(blogEntry.content).toEqual(blogEntryStub.content);
        });
      tick();
    }));
  });

  describe('#getList()', () => {
    it('calls the correct api url without query parameters', fakeAsync(() => {
      const expectedUrl = `/api/blog?sort=-created`;
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe(expectedUrl);
      });
      service.getList();
      tick();
    }));

    it('calls the correct api url with query parameters', fakeAsync(() => {
      const queryParams = {
        sort: '-created',
        where: 'created',
        gt: '2012-01-01'
      };
      const expectedUrl = `/api/blog?sort=-created&where=created&gt=2012-01-01`;
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe(expectedUrl);
      });
      service.getList(queryParams);
      tick();
    }));

    it('uses the GET request method', fakeAsync(() => {
      mockBackend.connections.subscribe(c => {
        expect(c.request.method).toBe(RequestMethod.Get);
      });
      service.getList();
      tick();
    }));

    it('returns the blog list', fakeAsync(() => {
      mockBackend.connections.subscribe(c => {
        const response = new ResponseOptions({
          body: JSON.stringify({blogs: blogListStub})
        });
        c.mockRespond(new Response(response));
      });
      service.getList()
        .then(blogListData => {
          const blogEntries = blogListData.items;
          expect(blogEntries[0].title).toEqual(blogListStub[0].title);
          expect(blogEntries[0].content).toEqual(blogListStub[0].content);
        });
      tick();
    }));
  });

  describe('updateBlogEntry()', () => {
    const title = 'Updated blog title';
    const editedBlogEntry: BlogEntry = Object.assign({}, blogEntryStub, {title});

    it('calls the correct api url', fakeAsync(() => {
      const expectedUrl = `/api/blog/${editedBlogEntry.slug}`;
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe(expectedUrl);
      });
      service.updateBlogEntry(editedBlogEntry);
      tick();
    }));

    it('uses the PUT request method', fakeAsync(() => {
      mockBackend.connections.subscribe(c => {
        expect(c.request.method).toBe(RequestMethod.Put);
      });
      service.updateBlogEntry(editedBlogEntry);
      tick();
    }));

    it('updates the blog entry', fakeAsync(() => {
      mockBackend.connections.subscribe(c => {
        expect(c.request._body).toBe(editedBlogEntry);
      });
      service.updateBlogEntry(editedBlogEntry);
      tick();
    }));

    it('navigates to correct url upon update success', fakeAsync(() => {
      const updatedSlug = 'updated-blog-title';
      const responseStub = Object.assign({}, editedBlogEntry, {slug: updatedSlug});
      const router = TestBed.get(Router);
      spyOn(router, 'navigate');
      mockBackend.connections.subscribe(c => {
        const response = new ResponseOptions({
          body: JSON.stringify(responseStub)
        });
        c.mockRespond(new Response(response));
      });
      service.updateBlogEntry(editedBlogEntry);
      tick();
      expect(router.navigate).toHaveBeenCalledWith(['/blog', responseStub.slug]);
    }));

    it('failed update should cause error field to be filled with msg',
       fakeAsync(() => {
      const failResponse = {
        msg: 'Update failed'
      };
      mockBackend.connections.subscribe(c => {
        const response = new ResponseOptions({
          body: JSON.stringify(failResponse)
        });
        c.mockError(new Response(response));
      });
      service.updateBlogEntry(editedBlogEntry);
      expect(service.error).toBe(failResponse.msg);
      tick();
    }));
  });
});
